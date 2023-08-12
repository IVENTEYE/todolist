import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote(state, action) {
      state.items.unshift(action.payload);
    },
    removeNote(state, action) {
        state.items = state.items.filter(note => note.id !== action.payload.noteRedactId)
    },
    updateNote(state, action) {
      state.items = state.items.map((note) => {
        if (note.id === action.payload.id) {
          return {
            ...note,
            day: action.payload.noteGetDate,
            month: action.payload.noteGetMonth,
            label: action.payload.title || action.payload.description.toString().replace(/( |<([^>]+)>)/ig, ""),
            description: action.payload.description,
            categoryIcon: action.payload.icon,
            category: action.payload.category,
          };
        }
        return note
      });
    },
    selectNote(state, action) {
        state.items = state.items.map((note) => {
            if (note.id === action.payload.noteRedactId) {
                return {
                    ...note,
                    selected: note.selected === false ? true : false,
                };
            }
            return note;
        })
    },
    removeCategory(state, action) {
        state.items = state.items.map((note) => {
            if (note.category === action.payload.textCategory) {
                return {
                    ...note,
                    categoryIcon: '#b7b7b7',
                    category: 'Без категории'
                }
            }
            return note;
        });
    },
    localStorageNotes(state, action) {
      state.items = action.payload;
    },
    reorderItem(state, action) {
      state.items = action.payload;
    },
  },
});

export const { addNote, removeNote, updateNote, selectNote, removeCategory, localStorageNotes, reorderItem } = notesSlice.actions;
export default notesSlice.reducer;
