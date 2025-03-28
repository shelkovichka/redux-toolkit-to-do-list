import {createSlice, PayloadAction, Action} from '@reduxjs/toolkit';
import {REHYDRATE} from 'redux-persist';

import {TagType} from '@/theme/types';
import {Task, TaskState} from '@/types/task.types';

const initialState: TaskState = {
  tasks: [],
  filterTag: null,
};

interface RehydrateAction extends Action {
  payload?: {
    tasks?: TaskState;
  };
}

export const taskSlice = createSlice({
  name: 'tasks',
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
      const {id, ...changes} = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        Object.assign(task, changes);
      }
    },
    setFilterTag: (state, action: PayloadAction<TagType | null>) => {
      state.filterTag = action.payload;
    },
    reorderTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(REHYDRATE, (state, action: RehydrateAction) => {
      if (action.payload && action.payload.tasks) {
        return {
          ...action.payload.tasks,
          filterTag: null,
        };
      }
      return state;
    });
  },
});

export const {addTask, deleteTask, updateTask, setFilterTag, reorderTasks} =
  taskSlice.actions;
export default taskSlice.reducer;
