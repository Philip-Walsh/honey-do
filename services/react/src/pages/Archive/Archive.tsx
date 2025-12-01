import type { FC } from 'react';
import { useMemo } from 'react';
import { useTodos } from '../../hooks/useTodos';
import TodoItem from '../../components/TodoItem/TodoItem';
import styles from './Archive.module.css';

export const Archive: FC = () => {
  const { todos, toggleTodo, deleteTodo } = useTodos();

  const completedTasks = useMemo(() => {
    return todos.filter(todo => todo.completed);
  }, [todos]);

  return (
    <div className={styles.archive}>
      <h1>Archive - {completedTasks.length} completed</h1>
      <div className={styles.list}>
        {completedTasks.map(todo => (
          <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} />
        ))}
        {completedTasks.length === 0 && <div className={styles.empty}>No completed tasks</div>}
      </div>
    </div>
  );
};

export default Archive;
