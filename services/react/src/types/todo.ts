/**
 * Represents a single todo item in the honey-do list with scheduling capabilities
 */
export interface Todo {
  /** Unique 4-digit identifier (0001-9999+) */
  readonly id: string;
  /** The name/title of the task */
  name: string;
  /** Optional detailed description */
  description?: string;
  /** Whether the todo has been completed */
  completed: boolean;
  /** When the todo was created */
  readonly createdOn: Date;
  /** When the todo is due (optional) */
  dueDate?: Date;
  /** Tags for categorization (e.g., 'pet', 'house', 'car') */
  tags: string[];
  /** Optional location for the task */
  location?: string;
  /** Person assigned to the task (can be unassigned) */
  assignee?: string;
  /** Recurrence pattern for recurring tasks */
  recurrence?: RecurrencePattern;
  /** Priority level of the task */
  priority: TodoPriority;
  /** Sequential ID for display (e.g., 1, 2, 3) */
  seq?: number;
}

/**
 * Recurrence pattern for repeating tasks
 */
export interface RecurrencePattern {
  /** Type of recurrence */
  type: 'daily' | 'weekly' | 'monthly' | 'yearly';
  /** Interval (e.g., every 2 weeks) */
  interval: number;
  /** Days of week for weekly recurrence (0 = Sunday) */
  daysOfWeek?: number[];
  /** Day of month for monthly recurrence */
  dayOfMonth?: number;
  /** End date for recurrence (optional) */
  endDate?: Date;
}

/**
 * Priority levels for todos
 */
export type TodoPriority = 'low' | 'medium' | 'high' | 'urgent';

/**
 * Filter options for displaying todos
 */
export type TodoFilter = 'all' | 'active' | 'completed' | 'today' | 'upcoming' | 'overdue';

/**
 * Actions that can be performed on todos
 */
export interface TodoActions {
  onAdd: (text: string) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onClearCompleted: () => void;
  onSetFilter: (filter: TodoFilter) => void;
}
