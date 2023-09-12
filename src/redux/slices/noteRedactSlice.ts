import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IRedact } from "../../types";


const initialState = {
    visible: false,
    id: '',
    title: '',
    category: 'Без категории',
    categoryColor: '#b7b7b7',
    description: '',
}

const noteRedactSlice = createSlice({
    name: "redact",
    initialState,
    reducers: {
        setRedact(state, action: PayloadAction<IRedact>) {
            state.visible = action.payload.visible;
            state.id = action.payload.id;
            state.title = action.payload.title;
            state.category = action.payload.category;
            state.categoryColor = action.payload.categoryColor;
            state.description = action.payload.description;
        },
    }
});

export const { setRedact } = noteRedactSlice.actions;
export default noteRedactSlice.reducer;