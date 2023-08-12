import { configureStore } from "@reduxjs/toolkit";
import noteRedactSlice from "../slices/noteRedactSlice";
import searchSlice from "../slices/searchSlice";
import tasksReducer from "../slices/tasksSlice"
import themeSlice from "../slices/themeSlice";
import notesSlice from "../slices/notesSlice";

export default configureStore({
    reducer: {
        tasks: tasksReducer,
        notes: notesSlice,
        search: searchSlice,
        theme: themeSlice,
        redact: noteRedactSlice,
    }
});