import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Task, TaskState } from "@/types/task.types";

const initialState: TaskState = {
  tasks: [],
  filterTag: null,
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTask: (
        state,
        action: PayloadAction<Partial<Task> & { id: string }>,
    ) => {
      const { id, ...changes } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        Object.assign(task, changes);
      }
    },
    setFilterTag: (state, action: PayloadAction<string | null>) => {
      state.filterTag = action.payload;
    },
  },
});

export const { addTask, deleteTask, updateTask, setFilterTag } =
  taskSlice.actions;
export default taskSlice.reducer;
