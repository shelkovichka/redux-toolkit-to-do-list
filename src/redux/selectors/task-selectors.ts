import { RootState } from "@/redux/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectFilterTag = (state: RootState) => state.tasks.filterTag;

export const selectFilteredTasks = createSelector(
  [selectTasks, selectFilterTag],
  (tasks, filterTag) => {
    if (!filterTag) return tasks;
    return tasks.filter((task) => task.tag === filterTag);
  }
);
