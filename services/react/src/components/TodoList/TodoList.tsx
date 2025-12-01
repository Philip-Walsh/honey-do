import type { FC } from 'react';
import { useMemo, useCallback } from 'react';
import type { Todo, TodoFilter } from '../../types/todo';
import TodoItem from '../TodoItem/TodoItem';
import styles from './TodoList.module.css';

interface TodoListProps {
  readonly todos: readonly Todo[];
  readonly filter: TodoFilter;
  readonly onToggle: (_id: string) => void;
  readonly onDelete: (_id: string) => void;
  readonly onClearCompleted: () => void;
  readonly onSetFilter: (_filter: TodoFilter) => void;
}

/**
 * Main todo list component with filtering and management functionality
 */
export const TodoList: FC<TodoListProps> = ({
  todos,
  filter,
  onToggle,
  onDelete,
  onClearCompleted,
  onSetFilter,
}) => {
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const activeTodosCount = useMemo(() => todos.filter(todo => !todo.completed).length, [todos]);

  const hasCompletedTodos = useMemo(() => todos.some(todo => todo.completed), [todos]);

  const handleFilterChange = useCallback(
    (newFilter: TodoFilter) => (): void => {
      onSetFilter(newFilter);
    },
    [onSetFilter]
  );

  const getEmptyStateMessage = (): string => {
    switch (filter) {
      case 'completed':
        return 'No completed tasks yet!';
      case 'active':
        return 'No active tasks! Time to add some.';
      default:
        return 'No tasks yet! Add your first honey-do item above.';
    }
  };

  return (
    <div className={styles.todoList}>
      <div className={styles.todoItems}>
        {filteredTodos.length === 0 ? (
          <div className={styles.emptyState}>{getEmptyStateMessage()}</div>
        ) : (
          filteredTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
          ))
        )}
      </div>

      {todos.length > 0 && (
        <div className={styles.todoFooter}>
          <span className={styles.todoCount}>
            {activeTodosCount} {activeTodosCount === 1 ? 'item' : 'items'} left
          </span>

          <div className={styles.todoFilters}>
            <button
              className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
              onClick={handleFilterChange('all')}
              type='button'
            >
              All
            </button>
            <button
              className={`${styles.filterButton} ${filter === 'active' ? styles.active : ''}`}
              onClick={handleFilterChange('active')}
              type='button'
            >
              Active
            </button>
            <button
              className={`${styles.filterButton} ${filter === 'completed' ? styles.active : ''}`}
              onClick={handleFilterChange('completed')}
              type='button'
            >
              Completed
            </button>
          </div>

          {hasCompletedTodos && (
            <button className={styles.clearCompleted} onClick={onClearCompleted} type='button'>
              Clear completed
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TodoList;
