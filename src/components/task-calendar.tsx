import * as React from "react";
import { useSelector } from "react-redux";
import { parseISO } from "date-fns";

import { RootState } from "@/redux/store";
import { Calendar } from "@/components/ui/calendar";

const TaskCalendar = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const taskDates = tasks
    .filter((task) => !task.checked)
    .map((task) => parseISO(task.date!));

  return <Calendar selected={taskDates} className="p-6" />;
};

export default TaskCalendar;
