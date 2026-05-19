import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSellerProducts } from "../service/product.api";

const initialState = {
    name: "product",
    initialState : {
        products: [],
    },
    reducers: {
        setSellerProducts: (state, action) => {
            state.products = action.payload;
        }
    }
}

export const { setSellerProducts } = productSlice.actions;
export default productSlice.reducer;