import React from "react";
import Lottie from "lottie-react";

import { Card } from "@/components/ui/card";
import emptyAnimation from "@/assets/empty.json";

const NoTasks = () => {
  return (
    <Card className="size-60 xl:size-80">
      <div className="flex flex-col justify-center items-center h-full">
        <Lottie
          animationData={emptyAnimation}
          loop={true}
          className="max-w-[200px]"
        />
        <p className="text-lg">No tasks found</p>
      </div>
    </Card>
  );
};

export default NoTasks;
