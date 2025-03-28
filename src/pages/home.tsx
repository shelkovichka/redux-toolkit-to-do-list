import {useSelector} from 'react-redux';

import {selectFilteredTasks} from '@/redux/selectors/task-selectors';
import TaskGrid from '@/components/task-grid';
import NoTasks from '@/components/no-tasks';

const Home = () => {
  const tasks = useSelector(selectFilteredTasks);
  const emptyTasks = !tasks.length;

  return (
    <div className="flex justify-center p-10">
      {emptyTasks ? <NoTasks /> : <TaskGrid tasks={tasks} />}
    </div>
  );
};

export default Home;
