import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSellerProducts } from "../service/product.api";

const initialState = {
    name: "product",
    initialState : {
        sellerProducts: [],
        products: []
    },
    reducers: {
        setSellerProducts: (state, action) => {
            state.sellerProducts = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        }
    }
}

export const { setSellerProducts, setProducts } = productSlice.actions;
export default productSlice.reducer;