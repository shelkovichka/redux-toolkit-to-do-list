import Lottie from 'lottie-react';

import {Card} from '@/components/ui/card';
import emptyAnimation from '@/assets/empty.json';

const NoTasks = () => {
  return (
    <Card className="task-card-size">
      <div className="flex flex-col justify-center items-center h-full">
        <Lottie
          animationData={emptyAnimation}
          loop={true}
          className="size-40"
        />
        <p className="text-lg">No tasks found</p>
      </div>
    </Card>
  );
};

export default NoTasks;
