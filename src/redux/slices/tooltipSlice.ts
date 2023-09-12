import { PayloadAction, createSlice } from "@reduxjs/toolkit"


const initialState = {
    text: "",
    image: "",
}

const tooltipSlice = createSlice({
    name: 'tooltip',
    initialState,
    reducers: {
        setText(state, action: PayloadAction<string>) {
            state.text = action.payload;
        },
        setImage(state, action: PayloadAction<string>) {
            state.image = action.payload;
        },
    }
});

export const { setText, setImage } = tooltipSlice.actions;
export default tooltipSlice.reducer;