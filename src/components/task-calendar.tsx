import React from "react";
import { useSelector } from "react-redux";

import { Calendar } from "@/components/ui/calendar";
import { selectUncompletedTaskDates } from "@/redux/selectors/task-selectors";

const TaskCalendar = () => {
  const taskDates = useSelector(selectUncompletedTaskDates);

  return <Calendar selected={taskDates} className="p-6" />;
};

export default TaskCalendar;
