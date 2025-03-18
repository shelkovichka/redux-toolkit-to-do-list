import {FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Pencil} from 'lucide-react';

import {Task} from '@/types/task.types';
import {updateTask} from '@/redux/slices/task-slice';
import {selectCurrentUserId} from '@/redux/selectors/task-selectors';

import TaskForm from './task-form';

export const EditTask: FC<Task> = (task) => {
  const dispatch = useDispatch();
  const currentUserId = useSelector(selectCurrentUserId);

  const handleUpdateTask = (data: Task) => {
    dispatch(
        updateTask({
          ...data,
          userId: currentUserId,
        }),
    );
  };

  return (
    <TaskForm
      initialData={task}
      onSubmit={handleUpdateTask}
      buttonLabel="Update your note"
      className="size-8 md:size-10"
      icon={<Pencil />}
    />
  );
};

export default EditTask;
