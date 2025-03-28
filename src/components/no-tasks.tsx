import Lottie from 'lottie-react';

import {Card} from '@/components/ui/card';
import emptyAnimation from '@/assets/empty.json';

import TaskContainer from './task-container';

const NoTasks = () => {
  return (
    <TaskContainer>
      <Card className={`size-72 sm:size-56 md:size-64 lg:size-80`}>
        <div className="flex flex-col justify-center items-center h-full">
          <Lottie
            animationData={emptyAnimation}
            loop={true}
            className="size-40"
          />
          <p className="text-lg">No tasks found</p>
        </div>
      </Card>
    </TaskContainer>
  );
};

export default NoTasks;
