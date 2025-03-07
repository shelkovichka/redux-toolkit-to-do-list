import { RootState } from "@/redux/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectFilterTag = (state: RootState) => state.tasks.filterTag;
export const selectCurrentUserId = (state: RootState) => state.auth.user?.uid;

export const selectUserTasks = createSelector(
  [selectTasks, selectCurrentUserId],
  (tasks, userId) => {
    if (!userId) return [];
    return tasks.filter((task) => task.userId === userId);
  }
);

export const selectFilteredTasks = createSelector(
  [selectUserTasks, selectFilterTag],
  (userTasks, filterTag) => {
    if (!filterTag) return userTasks;
    return userTasks.filter((task) => task.tag === filterTag);
  }
);
