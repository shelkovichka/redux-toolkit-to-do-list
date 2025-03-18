import {useDispatch, useSelector} from 'react-redux';
import {Plus} from 'lucide-react';

import {addTask} from '@/redux/slices/task-slice';
import TaskForm from '@/components/task-form';
import {selectCurrentUserId} from '@/redux/selectors/task-selectors';
import {Task} from '@/types/task.types';

const AddTask = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectCurrentUserId);

  const handleAddTask = (data: Task) => {
    dispatch(
        addTask({
          ...data,
          userId,
        }),
    );
  };

  return (
    <TaskForm
      onSubmit={handleAddTask}
      buttonLabel="Create a note"
      className="size-10"
      icon={<Plus />}
    />
  );
};

export default AddTask;
