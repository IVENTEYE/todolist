import { createSlice } from "@reduxjs/toolkit"


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
        setRedactVisible(state, action) {
            state.visible = action.payload
        },
        setRedactId(state, action) {
            state.id = action.payload
        },
        setRedactTitle(state, action) {
            state.title = action.payload
        },
        setRedactCategory(state, action) {
            state.category = action.payload
        },
        setRedactColor(state, action) {
            state.categoryColor = action.payload
        },
        setRedactDescription(state, action) {
            state.description = action.payload
        },
    }
});

export const { setRedactVisible, setRedactId, setRedactTitle, setRedactCategory, setRedactColor, setRedactDescription } = noteRedactSlice.actions;
export default noteRedactSlice.reducer;