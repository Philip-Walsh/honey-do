import { useState, useEffect, useCallback } from 'react';
import type { Todo, TodoFilter, TodoPriority, RecurrencePattern } from '../types/todo';
import { getTodos, createTodo, updateTodo as apiUpdateTodo, deleteTodo as apiDeleteTodo } from '../api/todos';

interface UseTodosReturn {
  readonly todos: readonly Todo[];
  readonly filter: TodoFilter;
  readonly addTodo: (_todoData: {
    name: string;
    description?: string;
    dueDate?: Date;
    tags: string[];
    location?: string;
    assignee?: string;
    priority: TodoPriority;
    isRecurring: boolean;
  }) => void;
  readonly updateTodo: (_id: string, _updates: Partial<Todo>) => Promise<Todo>;
  readonly toggleTodo: (_id: string) => void;
  readonly deleteTodo: (_id: string) => void;
  readonly clearCompleted: () => void;
  readonly setFilter: (_filter: TodoFilter) => void;
}

/**
 * Custom hook for managing todos state and operations
 */
export const useTodos = (): UseTodosReturn => {
  const [todos, setTodos] = useState<readonly Todo[]>([]);
  const [filter, setFilter] = useState<TodoFilter>('all');

  const fetchTodos = useCallback(async () => {
    try {
      const fetchedTodos = await getTodos();
      // Convert date strings back to Date objects if needed (JSON doesn't support Date)
      // But the API client returns JSON, so dates are strings.
      // We need to parse them.
      const todosWithDates = fetchedTodos.map((todo: any) => ({
        ...todo,
        createdOn: new Date(todo.createdOn),
        ...(todo.dueDate && { dueDate: new Date(todo.dueDate) }),
        ...(todo.recurrence?.endDate && {
          recurrence: {
            ...todo.recurrence,
            endDate: new Date(todo.recurrence.endDate),
          },
        }),
      }));
      setTodos(todosWithDates);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }, []);

  // Load todos on mount
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = useCallback(
    async (todoData: {
      name: string;
      description?: string;
      dueDate?: Date;
      tags: string[];
      location?: string;
      assignee?: string;
      priority: TodoPriority;
      isRecurring: boolean;
    }): Promise<void> => {
      try {
        // Create basic recurrence pattern if isRecurring is true
        let recurrence: RecurrencePattern | undefined;
        if (todoData.isRecurring) {
          recurrence = {
            type: 'weekly',
            interval: 1,
          };
        }

        const newTodoData: Partial<Todo> = {
          name: todoData.name,
          ...(todoData.description && { description: todoData.description }),
          ...(todoData.dueDate && { dueDate: todoData.dueDate }),
          tags: todoData.tags,
          ...(todoData.location && { location: todoData.location }),
          ...(todoData.assignee && { assignee: todoData.assignee }),
          ...(recurrence && { recurrence }),
          priority: todoData.priority,
        };

        const createdTodo = await createTodo(newTodoData);
        // Ensure dates are Date objects
        const todoWithDates = {
            ...createdTodo,
            createdOn: new Date(createdTodo.createdOn),
            ...(createdTodo.dueDate && { dueDate: new Date(createdTodo.dueDate) }),
        };
        
        setTodos(prev => [todoWithDates, ...prev]);
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    },
    []
  );

  const toggleTodo = useCallback(async (id: string): Promise<void> => {
    try {
      const todo = todos.find(t => t.id === id);
      if (!todo) return;

      const updated = await apiUpdateTodo(id, { completed: !todo.completed });
      setTodos(prev =>
        prev.map(t => (t.id === id ? { ...t, completed: updated.completed } : t))
      );
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  }, [todos]);

  const deleteTodo = useCallback(async (id: string): Promise<void> => {
    try {
      await apiDeleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }, []);

  const clearCompleted = useCallback(async (): Promise<void> => {
    try {
      const completedTodos = todos.filter(todo => todo.completed);
      await Promise.all(completedTodos.map(todo => apiDeleteTodo(todo.id)));
      setTodos(prev => prev.filter(todo => !todo.completed));
    } catch (error) {
      console.error('Error clearing completed todos:', error);
    }
  }, [todos]);

  return {
    todos,
    filter,
    addTodo,
  const updateTodo = useCallback(async (id: string, updates: Partial<Todo>): Promise<Todo> => {
    try {
      const updated = await apiUpdateTodo(id, updates);
      setTodos(prev =>
        prev.map(t => (t.id === id ? { ...t, ...updated } : t))
      );
      return updated;
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  }, []);

  return {
    todos,
    filter,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    setFilter,
  };
};
