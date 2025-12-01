import { ObjectId } from 'mongodb';

export type TodoPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface RecurrencePattern {
  type: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number;
  daysOfWeek?: number[];
  dayOfMonth?: number;
  endDate?: Date;
}

export interface Todo {
  _id?: ObjectId;
  id?: string; // For response
  name: string;
  description?: string | null;
  completed: boolean;
  createdOn: Date;
  updatedOn?: Date;
  dueDate?: Date | null;
  tags?: string[];
  location?: string | null;
  assignee?: string | null;
  recurrence?: RecurrencePattern | null;
  priority?: TodoPriority;
  seq?: number;
}
