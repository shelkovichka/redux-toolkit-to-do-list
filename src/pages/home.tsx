import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {deleteTask, setFilterTag} from '@/redux/slices/task-slice';
import Task from '@/components/task';
import NoTasks from '@/components/no-tasks';
import {selectFilteredTasks} from '@/redux/selectors/task-selectors';

const Home = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectFilteredTasks);

  const handleDeleteTask = (id: string) => {
    dispatch(deleteTask(id));
  };

  useEffect(() => {
    dispatch(setFilterTag(null));
  }, [dispatch]);

  return (
    <div className="flex justify-center p-10">
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {tasks.map((task) => (
          <Task
            key={task.id}
            onDelete={handleDeleteTask}
            {...task}
          />
        ))}
        {tasks.length === 0 && <NoTasks />}
      </div>
    </div>
  );
};

export default Home;
