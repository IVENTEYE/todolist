import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INote } from '../../types';

const initialState = {
  items: [],
  isLoading: false,
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote(state, action: PayloadAction<INote>) {
      state.items.unshift(action.payload);
    },
    removeNote(state, action) {
        state.items = state.items.filter(note => note.id !== action.payload.noteRedactId);
        console.log(action.payload);
    },
    updateNote(state, action) {
      state.items = state.items.map((note: INote) => {
        if (note.id === action.payload.noteId) {
          return {
            ...note,
            day: action.payload.noteGetDate,
            month: action.payload.noteGetMonth,
            label: action.payload.title || action.payload.description.toString().replace(/(\<(\/?[^>]+)>)/g, ""),
            description: action.payload.description,
            categoryIcon: action.payload.icon,
            category: action.payload.category,
          };
        }
        return note
      });
    },
    selectNote(state, action) {
        state.items = state.items.map((note: INote) => {
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
    localStorageNotes(state, action: PayloadAction<INote[]>) {
      state.items = action.payload;
    },
    reorderItem(state, action: PayloadAction<INote[]>) {
      state.items = action.payload;
    },
    setNotesLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    }
  },
});

export const { addNote, removeNote, updateNote, selectNote, removeCategory, localStorageNotes, reorderItem, setNotesLoading } = notesSlice.actions;
export default notesSlice.reducer;
