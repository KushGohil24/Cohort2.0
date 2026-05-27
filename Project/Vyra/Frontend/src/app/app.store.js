import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/state/product.slice";
import cartReducer from "../features/cart/state/cart.slice";
export const appStore = configureStore({
    reducer: {
        product: productReducer,
        cart: cartReducer,
    },
});