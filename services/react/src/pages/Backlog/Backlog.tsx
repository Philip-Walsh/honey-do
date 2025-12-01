import type { FC } from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTodos, deleteTodo as apiDeleteTodo, updateTodo as apiUpdateTodo } from '../../api/todos';
import { Todo } from '../../types/todo';
import styles from './Backlog.module.css';

export const Backlog: FC = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'active' | 'completed' | 'all'>('active');
  const [loading, setLoading] = useState(false);

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    try {
      let apiFilter: { completed?: boolean } | undefined;
      if (filter === 'active') apiFilter = { completed: false };
      else if (filter === 'completed') apiFilter = { completed: true };
      
      const fetchedTodos = await getTodos(apiFilter);
      
      // Parse dates
      const parsedTodos = fetchedTodos.map((todo: any) => ({
        ...todo,
        createdOn: new Date(todo.createdOn),
        ...(todo.dueDate && { dueDate: new Date(todo.dueDate) }),
      }));
      
      setTodos(parsedTodos);
    } catch (error) {
      console.error('Error fetching backlog:', error);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
        await apiDeleteTodo(id);
        fetchTodos();
    }
  };

  const handleToggle = async (todo: Todo) => {
      await apiUpdateTodo(todo.id, { completed: !todo.completed });
      fetchTodos();
  };

  const formatDate = (date?: Date) => {
      if (!date) return '-';
      return new Date(date).toLocaleDateString();
  };

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Backlog</h1>
        <div className={styles.filters}>
          <button 
            className={`${styles.filterBtn} ${filter === 'active' ? styles.active : ''}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button 
            className={`${styles.filterBtn} ${filter === 'completed' ? styles.active : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
          <button 
            className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Status</th>
              <th>Task</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th>Assignee</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
                <tr><td colSpan={6} className={styles.loading}>Loading...</td></tr>
            ) : todos.length === 0 ? (
                <tr><td colSpan={6} className={styles.empty}>No tasks found</td></tr>
            ) : (
                todos.map(todo => (
                    <tr key={todo.id} className={todo.completed ? styles.completedRow : ''}>
                        <td>
                            <input 
                                type="checkbox" 
                                checked={todo.completed} 
                                onChange={() => handleToggle(todo)}
                                className={styles.checkbox}
                            />
                        </td>
                        <td>
                            <div className={styles.taskName}>{todo.name}</div>
                            {todo.description && <div className={styles.taskDesc}>{todo.description}</div>}
                            <div className={styles.tags}>
                                {todo.tags.map(tag => <span key={tag} className={styles.tag}>{tag}</span>)}
                            </div>
                        </td>
                        <td>{formatDate(todo.dueDate)}</td>
                        <td>
                            <span className={`${styles.priority} ${styles[todo.priority]}`}>
                                {todo.priority}
                            </span>
                        </td>
                        <td>{todo.assignee || '-'}</td>
                        <td>
                            <div className={styles.actions}>
                                <button 
                                    onClick={() => navigate(`/edit/${todo.id}`)}
                                    className={styles.editBtn}
                                    aria-label={`Edit "${todo.name}"`}
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={() => handleDelete(todo.id)}
                                    className={styles.deleteBtn}
                                    aria-label={`Delete "${todo.name}"`}
                                >
                                    ✕
                                </button>
                            </div>
                        </td>
                    </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Backlog;
