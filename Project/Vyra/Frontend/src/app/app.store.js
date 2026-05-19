import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "../features/products/state/product.slice";

export const appStore = configureStore({
    reducer: {
        product: productReducer,
    },
});