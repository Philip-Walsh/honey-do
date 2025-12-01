import type { FC } from 'react';
import { useMemo } from 'react';
import type { Todo } from '../../types/todo';
import { useTodos } from '../../hooks/useTodos';
import TodoItem from '../../components/TodoItem/TodoItem';
import styles from './AssignedToMe.module.css';

export const AssignedToMe: FC = () => {
  const { todos, toggleTodo, deleteTodo } = useTodos();

  const tasksByAssignee = useMemo(() => {
    const groups: Record<string, Todo[]> = {};
    
    todos.filter(t => t.assignee).forEach(todo => {
      if (todo.assignee) {
        if (!groups[todo.assignee]) {
          groups[todo.assignee] = [];
        }
        const group = groups[todo.assignee];
        if (group) {
          group.push(todo);
        }
      }
    });
    
    return groups;
  }, [todos]);

  return (
    <div className={styles.assigned}>
      <h1>Assigned Tasks</h1>
      {Object.entries(tasksByAssignee).map(([assignee, assigneeTodos]) => (
        <div key={assignee} className={styles.section}>
          <h2>{assignee} - {assigneeTodos.filter(t => !t.completed).length} active</h2>
          <div className={styles.list}>
            {assigneeTodos.map(todo => (
              <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} />
            ))}
          </div>
        </div>
      ))}
      {Object.keys(tasksByAssignee).length === 0 && (
        <div className={styles.empty}>No assigned tasks</div>
      )}
    </div>
  );
};

export default AssignedToMe;
