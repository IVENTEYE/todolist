import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from '../../types';


const initialState = {
  items: [],
  isLoading: false,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    loadLocalStorage(state, action: PayloadAction<ITask[]>) {
      state.items = action.payload;
    },
    addItem(state, { payload }: PayloadAction<{}>) {
      const date = String(new Date().getDate());
      const month = String(new Date().getMonth());

      state.items = state.items.map(task => {
        if (String(task.day) === date && String(task.month) === month) {
          return {
            ...task,
            dateVisible: false,
          }
        }
        return task;
      });

      state.items.unshift(payload);
    },
    onRemoveItem(state, { payload }) {
        const filteredTasks = state.items.filter(task => task.id !== payload.taskId);
        state.items = state.items.map(task => {
          if (task.id === payload.taskId && task.dateVisible === payload.dateVisible) {
            filteredTasks.forEach((item, index) => index === 0 ? item.dateVisible = true : null);
          }
          return task
        });
        state.items = filteredTasks;
    },
    onChangeStateItem(state, { payload }) {
      state.items = state.items.map(task => {
        if (task.id === payload.taskId) {
          return {
            ...task,
            checkState: !payload.state,
          };
        }
        return task;
      });
    },
    onUpdateItem(state, { payload }) {
      state.items = state.items.map(task => {
        if (task.id === payload.taskId) {
          return {
            ...task,
            title: payload.title,
          };
        }
        return task;
      });
    },
    setTasksLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { addItem, onRemoveItem, onChangeStateItem, onUpdateItem, loadLocalStorage, setTasksLoading } = taskSlice.actions;
export default taskSlice.reducer;
