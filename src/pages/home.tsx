import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/redux/store";
import { deleteTask, updateTask } from "@/redux/slices/task-slice";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AddTask from "@/components/add-task";
import TaskCalendar from "@/components/task-calendar";
import Task from "@/components/task";
import NoTasks from "@/components/no-tasks";

const Home = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const handleCheckboxChange = (id: string, checked: boolean) => {
    dispatch(updateTask({ id, checked }));
  };

  const handleDeleteTask = (id: string) => {
    dispatch(deleteTask(id));
  };

  const renderNoTasks = () => {
    if (tasks.length === 0) return <NoTasks />;
  };

  return (
    <div className="w-full h-screen flex items-center justify-center gap-10">
      <Card className="w-full max-w-lg h-3/5 sm:h-1/2 overflow-scroll">
        <CardHeader className="sticky top-0 z-50 bg-background/95 backdrop-blur py-4 supports-[backdrop-filter]:bg-background/60">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-bold">Your Todos</h1>
            <AddTask />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            {tasks.map((task) => (
              <Task
                key={task.id}
                onCheckboxChange={handleCheckboxChange}
                onDelete={handleDeleteTask}
                {...task}
              />
            ))}
            {renderNoTasks()}
          </div>
        </CardContent>
      </Card>
      <div className="hidden md:block">
        <TaskCalendar />
      </div>
    </div>
  );
};

export default Home;
