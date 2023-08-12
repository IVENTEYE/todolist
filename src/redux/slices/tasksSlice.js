import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    loadLocalStorage(state, action) {
        state.items = action.payload;
    },
    addItem(state, { payload }) {
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
        const filteredTasks = state.items.filter(task => task.id !== payload.id);
        state.items = state.items.map(task => {
          if (task.id === payload.id && task.dateVisible === payload.dateVisible) {
            filteredTasks.forEach((item, index) => index === 0 ? item.dateVisible = true : null);
          }
          return task
        });
        state.items = filteredTasks;
    },
    onChangeStateItem(state, { payload }) {
      state.items = state.items.map(task => {
        if (task.id === payload.id) {
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
        if (task.id === payload.id) {
          return {
            ...task,
            title: payload.title,
          };
        }
        return task;
      });
    },
  },
});

export const { addItem, onRemoveItem, onChangeStateItem, onUpdateItem, loadLocalStorage } = taskSlice.actions;
export default taskSlice.reducer;
