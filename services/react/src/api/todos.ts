import { Todo } from '../types/todo';

const API_URL = '/api/todos';

export const getTodos = async (filter?: { completed?: boolean }): Promise<Todo[]> => {
  let url = API_URL;
  if (filter) {
    const params = new URLSearchParams();
    if (filter.completed !== undefined) {
      params.append('completed', filter.completed.toString());
    }
    url += `?${params.toString()}`;
  }
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  return response.json();
};

export const createTodo = async (todoData: Partial<Todo>): Promise<Todo> => {
  const newTodo = {
    ...todoData,
    completed: false,
    createdOn: new Date(),
  };
  
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTodo),
  });
  if (!response.ok) {
    throw new Error('Failed to create todo');
  }
  return response.json();
};

export const updateTodo = async (id: string, updates: Partial<Todo>): Promise<Todo> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  if (!response.ok) {
    throw new Error('Failed to update todo');
  }
  return response.json();
};

export const deleteTodo = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete todo');
  }
};
