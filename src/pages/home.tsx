import React from "react";
import { Calendar, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "lottie-react";
import { format } from "date-fns";

import { RootState } from "@/redux/store";
import { deleteTask, updateTask } from "@/redux/slices/task-slice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import AddTask from "@/components/add-task";
import emptyAnimation from "@/assets/empty.json";
import TaskCalendar from "@/components/task-calendar";

const Home = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const formatDate = (date: string) => {
    return format(date, "dd.MM.yy");
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    dispatch(updateTask({ id, checked }));
  };

  const handleDeleteTask = (id: string) => {
    dispatch(deleteTask(id));
  };

  const tasksEmpty = tasks.length === 0 && (
    <div className="flex flex-col justify-center items-center h-full">
      <Lottie
        animationData={emptyAnimation}
        loop={true}
        className="max-w-[200px]"
      />
      <p className="text-lg">No tasks found</p>
    </div>
  );

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
            {tasks &&
              tasks.map(({ id, title, date, checked }) => (
                <div
                  className="flex justify-between items-center rounded-lg p-4 bg-muted text-muted-foreground"
                  key={id}
                >
                  <div className="flex-col space-y-2">
                    <div className="flex items-center gap-4">
                      <Checkbox
                        checked={checked}
                        onCheckedChange={(checked: boolean) =>
                          handleCheckboxChange(id, checked)
                        }
                      />
                      <p className={`${checked ? "line-through" : ""}`}>
                        {title}
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <Calendar className="w-4 h-4" />
                      <p className=" text-sm">Due {formatDate(date!)}</p>
                    </div>
                  </div>

                  <Button variant="ghost" onClick={() => handleDeleteTask(id)}>
                    <Trash className="w-5 h-5" />
                  </Button>
                </div>
              ))}
            {tasksEmpty}
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
