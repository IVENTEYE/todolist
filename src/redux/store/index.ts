import { configureStore } from "@reduxjs/toolkit";
import noteRedactSlice from "../slices/noteRedactSlice.ts";
import inputSlice from "../slices/inputSlice.ts";
import tasksReducer from "../slices/tasksSlice.ts"
import themeSlice from "../slices/themeSlice.ts";
import notesSlice from "../slices/notesSlice.ts";
import userSlice from "../slices/userSlice.ts";
import tooltipSlice from "../slices/tooltipSlice.ts";

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        notes: notesSlice,
        input: inputSlice,
        theme: themeSlice,
        redact: noteRedactSlice,
        user: userSlice,
        tooltip: tooltipSlice,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;