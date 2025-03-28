import {FC, useState} from 'react';
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import {useDispatch} from 'react-redux';

import SortableTask from '@/components/sortable-task';
import {Task as TaskType} from '@/types/task.types';
import {reorderTasks} from '@/redux/slices/task-slice';
import {
  MouseSensor,
  KeyboardSensor,
  PointerSensor,
} from '@/utils/dnd-sensors';

import TaskContainer from './task-container';

interface TaskGridProps {
  tasks: TaskType[];
}

const TaskGrid: FC<TaskGridProps> = ({tasks}) => {
  const dispatch = useDispatch();
  const [orderedTasks, setOrderedTasks] = useState<TaskType[]>(tasks);

  if (JSON.stringify(tasks) !== JSON.stringify(orderedTasks)) {
    setOrderedTasks(tasks);
  }

  const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(MouseSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event;

    if (!over || active.id === over.id) {
      return;
    }

    setOrderedTasks((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      const newTasks = arrayMove(items, oldIndex, newIndex);
      dispatch(reorderTasks(newTasks));
      return newTasks;
    });
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={orderedTasks.map((task) => task.id)}
        strategy={horizontalListSortingStrategy}
      >
        <TaskContainer>
          {orderedTasks.map((task) => (
            <SortableTask key={task.id} task={task} />
          ))}
        </TaskContainer>
      </SortableContext>
    </DndContext>
  );
};

export default TaskGrid;
