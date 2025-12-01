import type { FC, FormEvent, ChangeEvent } from 'react';
import { useState, useCallback, useEffect } from 'react';
import type { TodoPriority } from '../../types/todo';
import styles from './AddTodo.module.css';

interface AddTodoProps {
  readonly onAdd: (_todoData: {
    name: string;
    description?: string;
    dueDate?: Date;
    tags: string[];
    location?: string;
    assignee?: string;
    priority: TodoPriority;
    isRecurring: boolean;
  }) => void;
  readonly initialData?: any;
  readonly mode?: 'add' | 'edit';
}

/**
 * Form component for adding new todo items
 */
export const AddTodo: FC<AddTodoProps> = ({ onAdd, initialData, mode = 'add' }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [dueDate, setDueDate] = useState(initialData?.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : '');
  const [tags, setTags] = useState(initialData?.tags?.join(', ') || '');
  const [location, setLocation] = useState(initialData?.location || '');
  const [assignee, setAssignee] = useState(initialData?.assignee || '');
  const [priority, setPriority] = useState<TodoPriority>(initialData?.priority || 'medium');
  const [isRecurring, setIsRecurring] = useState(initialData?.isRecurring || false);

  // Update state when initialData changes
  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setDescription(initialData.description || '');
      setDueDate(initialData.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : '');
      setTags(initialData.tags?.join(', ') || '');
      setLocation(initialData.location || '');
      setAssignee(initialData.assignee || '');
      setPriority(initialData.priority || 'medium');
      setIsRecurring(initialData.isRecurring || false);
    }
  }, [initialData]);

  const handleNameChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  }, []);

  const handleDescriptionChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>): void => {
    setDescription(e.target.value);
  }, []);

  const handleDueDateChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setDueDate(e.target.value);
  }, []);

  const handleTagsChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setTags(e.target.value);
  }, []);

  const handleLocationChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setLocation(e.target.value);
  }, []);

  const handleAssigneeChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setAssignee(e.target.value);
  }, []);

  const handlePriorityChange = useCallback((e: ChangeEvent<HTMLSelectElement>): void => {
    setPriority(e.target.value as TodoPriority);
  }, []);

  const handleRecurringChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setIsRecurring(e.target.checked);
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>): void => {
      e.preventDefault();

      const trimmedName = name.trim();
      if (trimmedName) {
        const parsedTags = tags
          .split(',')
          .map((tag: string) => tag.trim())
          .filter((tag: string) => tag.length > 0);

        const trimmedDescription = description.trim();
        const trimmedLocation = location.trim();
        const trimmedAssignee = assignee.trim();

        onAdd({
          name: trimmedName,
          ...(trimmedDescription && { description: trimmedDescription }),
          ...(dueDate && { dueDate: new Date(dueDate) }),
          tags: parsedTags,
          ...(trimmedLocation && { location: trimmedLocation }),
          ...(trimmedAssignee && { assignee: trimmedAssignee }),
          priority,
          isRecurring,
        });

        // Reset form
        setName('');
        setDescription('');
        setDueDate('');
        setTags('');
        setLocation('');
        setAssignee('');
        setPriority('medium');
        setIsRecurring(false);
      }
    },
    [name, description, dueDate, tags, location, assignee, priority, isRecurring, onAdd]
  );

  return (
    <form onSubmit={handleSubmit} className={styles.addTodoForm}>
      <div className={styles.inputRow}>
        <input
          type='text'
          value={name}
          onChange={handleNameChange}
          placeholder='Task name...'
          className={styles.nameInput}
          aria-label='Task name'
          name='name'
          autoComplete='off'
          maxLength={100}
        />
      </div>

      <textarea
        value={description}
        onChange={handleDescriptionChange}
        placeholder='Description (optional)...'
        className={styles.descriptionInput}
        aria-label='Task description'
        maxLength={500}
      />

      <div className={styles.metadataRow}>
        <div className={styles.fieldGroup}>
          <label htmlFor='dueDate' className={styles.label}>
            Due Date
          </label>
          <input
            id='dueDate'
            type='date'
            value={dueDate}
            onChange={handleDueDateChange}
            className={styles.input}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor='priority' className={styles.label}>
            Priority
          </label>
          <select
            id='priority'
            value={priority}
            onChange={handlePriorityChange}
            className={styles.select}
          >
            <option value='low'>Low</option>
            <option value='medium'>Medium</option>
            <option value='high'>High</option>
            <option value='urgent'>Urgent</option>
          </select>
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor='assignee' className={styles.label}>
            Assignee
          </label>
          <input
            id='assignee'
            type='text'
            value={assignee}
            onChange={handleAssigneeChange}
            placeholder='Unassigned'
            className={styles.input}
            maxLength={50}
          />
        </div>
      </div>

      <div className={styles.metadataRow}>
        <div className={styles.fieldGroup}>
          <label htmlFor='tags' className={styles.label}>
            Tags (comma-separated)
          </label>
          <input
            id='tags'
            type='text'
            value={tags}
            onChange={handleTagsChange}
            placeholder='e.g., house, pet, car'
            className={styles.tagsInput}
            maxLength={100}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor='location' className={styles.label}>
            Location
          </label>
          <input
            id='location'
            type='text'
            value={location}
            onChange={handleLocationChange}
            placeholder='Optional'
            className={styles.input}
            maxLength={100}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>&nbsp;</label>
          <div className={styles.checkboxGroup}>
            <input
              id='recurring'
              type='checkbox'
              checked={isRecurring}
              onChange={handleRecurringChange}
              className={styles.checkbox}
            />
            <label htmlFor='recurring'>Recurring Task</label>
          </div>
        </div>
      </div>

      <div className={styles.buttonRow}>
        <button type='submit' className={styles.addBtn} disabled={!name.trim()}>
          {mode === 'edit' ? 'Update Task' : 'Add Task'}
        </button>
      </div>
    </form>
  );
};

export default AddTodo;
