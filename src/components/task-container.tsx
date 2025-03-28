import React, {FC, type PropsWithChildren} from 'react';

const TaskContainer: FC<PropsWithChildren> = ({children}) => {
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">{children}</div>
  );
};

export default TaskContainer;
