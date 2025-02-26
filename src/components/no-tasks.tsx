import React from "react";
import Lottie from "lottie-react";

import emptyAnimation from "@/assets/empty.json";

const NoTasks = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <Lottie
        animationData={emptyAnimation}
        loop={true}
        className="max-w-[200px]"
      />
      <p className="text-lg">No tasks found</p>
    </div>
  );
};

export default NoTasks;
