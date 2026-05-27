import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
    },
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        },
        addItems: (state, action) => {
            state.items.push(action.payload);
        },
        removeItems: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        }
    }
})

export const { setItems, addItems, removeItems } = cartSlice.actions;
export default cartSlice.reducer;