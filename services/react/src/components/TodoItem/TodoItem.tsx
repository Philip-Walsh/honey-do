import type { FC } from 'react';
import type { Todo } from '../../types/todo';
import styles from './TodoItem.module.css';

interface TodoItemProps {
  readonly todo: Todo;
  readonly onToggle: (_id: string) => void;
  readonly onDelete: (_id: string) => void;
  readonly onEdit: (_id: string) => void;
}

/**
 * Individual todo item component with toggle and delete functionality
 */
export const TodoItem: FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  const handleToggle = (): void => {
    onToggle(todo.id);
  };

  const handleDelete = (): void => {
    onDelete(todo.id);
  };

  const handleEdit = (): void => {
    onEdit(todo.id);
  };

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}>
      <div className={styles.header}>
        <input
          type='checkbox'
          checked={todo.completed}
          onChange={handleToggle}
          className={styles.checkbox}
          aria-label={`Mark "${todo.name}" as ${todo.completed ? 'incomplete' : 'complete'}`}
        />
        <div className={styles.mainContent}>
          <div className={styles.titleRow}>
            <span className={styles.todoId}>#{String(todo.seq || todo.id).padStart(4, '0')}</span>
            <span className={styles.todoName}>{todo.name}</span>
          </div>
          {todo.description && <div className={styles.description}>{todo.description}</div>}
          <div className={styles.metadata}>
            {todo.tags.length > 0 && (
              <div className={styles.tags}>
                {todo.tags.map(tag => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {todo.assignee && <span className={styles.assignee}>👤 {todo.assignee}</span>}
            {todo.location && <span className={styles.location}>📍 {todo.location}</span>}
            {todo.dueDate && <span className={styles.dueDate}>📅 {formatDate(todo.dueDate)}</span>}
            {todo.recurrence && <span className={styles.recurring}>🔄 Recurring</span>}
          </div>
        </div>
        <div className={styles.actions}>
          <button
            onClick={handleEdit}
            className={styles.editBtn}
            aria-label={`Edit "${todo.name}"`}
            type='button'
          >
            ✎
          </button>
          <button
            onClick={handleDelete}
            className={styles.deleteBtn}
            aria-label={`Delete "${todo.name}"`}
            type='button'
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
