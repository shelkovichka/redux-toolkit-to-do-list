import { createSelector } from "@reduxjs/toolkit";
import { parseISO } from "date-fns";

import { Task } from "@/types/task.types";
import { RootState } from "@/redux/store";

export const selectTasks = (state: RootState) => state.tasks.tasks;

export const selectUncompletedTaskDates = createSelector(
  [selectTasks],
  (tasks: Task[]) =>
    tasks.filter((task) => !task.checked).map((task) => parseISO(task.date!))
);
