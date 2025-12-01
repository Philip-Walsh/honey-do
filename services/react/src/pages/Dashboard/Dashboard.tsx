import type { FC } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  useDroppable,
  DragOverlay,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useTodos } from '../../hooks/useTodos';
import { TodoItem } from '../../components/TodoItem/TodoItem';
import { Todo } from '../../types/todo';
import styles from './Dashboard.module.css';

const SortableTodoItem = ({ todo, onDelete, onToggle, onEdit }: { todo: Todo; onDelete: (id: string) => void; onToggle: (id: string) => void; onEdit: (id: string) => void }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id, data: { todo } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TodoItem todo={todo} onDelete={onDelete} onToggle={onToggle} onEdit={onEdit} />
    </div>
  );
};

const DroppableColumn = ({ id, title, todos, onDelete, onToggle, onEdit }: { id: string; title: string; todos: Todo[]; onDelete: (id: string) => void; onToggle: (id: string) => void; onEdit: (id: string) => void }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className={styles.column} ref={setNodeRef}>
      <div className={styles.columnHeader}>
        <h2>{title}</h2>
        <span className={styles.count}>{todos.length}</span>
      </div>
      <div className={styles.columnContent}>
        <SortableContext items={todos.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {todos.map(todo => (
            <SortableTodoItem key={todo.id} todo={todo} onDelete={onDelete} onToggle={onToggle} onEdit={onEdit} />
          ))}
        </SortableContext>
        {todos.length === 0 && <div className={styles.empty}>No tasks</div>}
      </div>
    </div>
  );
};

export const Dashboard: FC = () => {
  const { todos, deleteTodo, toggleTodo, updateTodo } = useTodos();
  const navigate = useNavigate();
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);

  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
        activationConstraint: {
            distance: 8,
        },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const todoTasks = todos.filter(t => !t.completed && (!t.tags?.includes('In Progress')));
  const inProgressTasks = todos.filter(t => !t.completed && t.tags?.includes('In Progress'));
  const doneTasks = todos.filter(t => t.completed);

  const handleDragStart = (event: DragStartEvent) => {
    const todo = todos.find(t => t.id === event.active.id);
    if (todo) setActiveTodo(todo);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTodo(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;
    
    // Find the todo
    const todo = todos.find(t => t.id === activeId);
    if (!todo) return;

    // Determine target column
    let targetColumn = overId;
    
    // If dropped on an item, find that item's column
    if (overId !== 'todo' && overId !== 'inprogress' && overId !== 'done') {
        const overTodo = todos.find(t => t.id === overId);
        if (overTodo) {
            if (overTodo.completed) targetColumn = 'done';
            else if (overTodo.tags?.includes('In Progress')) targetColumn = 'inprogress';
            else targetColumn = 'todo';
        }
    }

    // Update todo based on target column
    if (targetColumn === 'todo') {
        if (todo.completed || todo.tags?.includes('In Progress')) {
            await updateTodo(todo.id, { 
                completed: false, 
                tags: (todo.tags || []).filter(t => t !== 'In Progress') 
            });
        }
    } else if (targetColumn === 'inprogress') {
        if (todo.completed || !todo.tags?.includes('In Progress')) {
            await updateTodo(todo.id, { 
                completed: false, 
                tags: [...(todo.tags || []).filter(t => t !== 'In Progress'), 'In Progress'] 
            });
        }
    } else if (targetColumn === 'done') {
        if (!todo.completed) {
            await updateTodo(todo.id, { completed: true });
        }
    }
  };

  return (
    <section className={styles.dashboard}>
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className={styles.board}>
          <DroppableColumn 
            id="todo" 
            title="TODO" 
            todos={todoTasks} 
            onDelete={deleteTodo} 
            onToggle={toggleTodo} 
            onEdit={handleEdit}
          />
          <DroppableColumn 
            id="inprogress" 
            title="IN PROGRESS" 
            todos={inProgressTasks} 
            onDelete={deleteTodo} 
            onToggle={toggleTodo} 
            onEdit={handleEdit}
          />
          <DroppableColumn 
            id="done" 
            title="DONE" 
            todos={doneTasks} 
            onDelete={deleteTodo} 
            onToggle={toggleTodo} 
            onEdit={handleEdit}
          />
        </div>
        <DragOverlay>
            {activeTodo ? (
                <div style={{ transform: 'scale(1.05)' }}>
                    <TodoItem todo={activeTodo} onDelete={() => {}} onToggle={() => {}} onEdit={() => {}} />
                </div>
            ) : null}
        </DragOverlay>
      </DndContext>
    </section>
  );
};

export default Dashboard;
