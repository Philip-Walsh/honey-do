import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTodos } from '../../hooks/useTodos';
import AddTodo from '../../components/AddTodo/AddTodo';
import styles from './ManageTodo.module.css';

export const ManageTodo: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { todos, addTodo, updateTodo } = useTodos();
  const [initialData, setInitialData] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const todo = todos.find(t => t.id === id);
      if (todo) {
        setInitialData({
          name: todo.name,
          description: todo.description,
          dueDate: todo.dueDate,
          tags: todo.tags,
          location: todo.location,
          assignee: todo.assignee,
          priority: todo.priority,
          isRecurring: todo.recurrence,
        });
      }
    }
  }, [id, todos]);

  const handleSubmit = async (data: any) => {
    if (id) {
      await updateTodo(id, data);
    } else {
      await addTodo(data);
    }
    navigate('/backlog'); // Go to backlog
  };

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h1>{id ? 'Update Task' : 'Add New Task'}</h1>
        <button onClick={() => navigate('/')} className={styles.closeBtn} aria-label="Close">✕</button>
      </div>
      <AddTodo 
        onAdd={handleSubmit} 
        initialData={initialData} 
        mode={id ? 'edit' : 'add'}
      />
    </section>
  );
};

export default ManageTodo;
