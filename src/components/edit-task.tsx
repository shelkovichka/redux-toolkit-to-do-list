import {FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Pencil} from 'lucide-react';
import {useSnackbar} from 'notistack';

import {Task} from '@/types/task.types';
import {updateTask} from '@/redux/slices/task-slice';
import {selectCurrentUserId} from '@/redux/selectors/task-selectors';
import TaskForm from '@/components/task-form';


const EditTask: FC<Task> = (task) => {
  const dispatch = useDispatch();
  const currentUserId = useSelector(selectCurrentUserId);
  const {enqueueSnackbar} = useSnackbar();

  const handleUpdateTask = (data: Task) => {
    dispatch(
        updateTask({
          ...data,
          userId: currentUserId,
        }),
    );
    enqueueSnackbar('Note updated!', {variant: 'success'});
  };

  return (
    <TaskForm
      key={`task-${task.id}-${task.tag}-${task.title}`}
      initialData={task}
      onSubmit={handleUpdateTask}
      buttonLabel="Update your note"
      className="size-8 md:size-10"
      tooltipText="Edit note"
      icon={<Pencil />}
    />
  );
};

export default EditTask;
