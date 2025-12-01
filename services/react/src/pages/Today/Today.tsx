import type { FC } from 'react';
import { useTodos } from '../../hooks/useTodos';
import { TodoItem } from '../../components/TodoItem/TodoItem';
import styles from './Today.module.css';

export const Today: FC = () => {
  const { todos, deleteTodo, toggleTodo } = useTodos();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isOverdue = (date: Date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d < today;
  };

  const isToday = (date: Date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d.getTime() === today.getTime();
  };

  // Filter active tasks (on board)
  const activeTodos = todos.filter(t => !t.completed);

  const overdueTasks = activeTodos.filter(t => t.dueDate && isOverdue(t.dueDate));
  const todayTasks = activeTodos.filter(t => t.dueDate && isToday(t.dueDate));
  
  // Upcoming: Assigned tasks with due dates in future, sorted by date then priority
  const upcomingTasks = activeTodos.filter(t => 
    t.dueDate && !isOverdue(t.dueDate) && !isToday(t.dueDate) && t.assignee
  ).sort((a, b) => {
    const dateA = new Date(a.dueDate!).getTime();
    const dateB = new Date(b.dueDate!).getTime();
    if (dateA !== dateB) return dateA - dateB;
    // Priority sort (high to low)
    const priorityMap = { urgent: 3, high: 2, medium: 1, low: 0 };
    return priorityMap[b.priority] - priorityMap[a.priority];
  });

  // Undated: Assigned tasks without due date
  const undatedTasks = activeTodos.filter(t => !t.dueDate && t.assignee);

  return (
    <section className={styles.container}>
      {overdueTasks.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.overdueTitle}>OVERDUE</h2>
          <div className={styles.list}>
            {overdueTasks.map(todo => (
              <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} onToggle={toggleTodo} />
            ))}
          </div>
        </div>
      )}

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Today</h2>
        <div className={styles.list}>
          {todayTasks.length > 0 ? (
            todayTasks.map(todo => (
              <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} onToggle={toggleTodo} />
            ))
          ) : (
            <div className={styles.empty}>No tasks due today</div>
          )}
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Upcoming Assigned</h2>
        <div className={styles.list}>
          {upcomingTasks.length > 0 ? (
            upcomingTasks.map(todo => (
              <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} onToggle={toggleTodo} />
            ))
          ) : (
            <div className={styles.empty}>No upcoming assigned tasks</div>
          )}
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Undated Assigned</h2>
        <div className={styles.list}>
          {undatedTasks.length > 0 ? (
            undatedTasks.map(todo => (
              <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} onToggle={toggleTodo} />
            ))
          ) : (
            <div className={styles.empty}>No undated assigned tasks</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Today;
