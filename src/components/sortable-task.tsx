import {FC} from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

import Task from '@/components/task';
import {Task as TaskType} from '@/types/task.types';

interface SortableTaskProps {
  task: TaskType;
}

const SortableTask: FC<SortableTaskProps> = ({task}) => {
  const {attributes, listeners, setNodeRef, transform, transition} =
    useSortable({id: task.id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Task {...task} />
    </div>
  );
};

export default SortableTask;
