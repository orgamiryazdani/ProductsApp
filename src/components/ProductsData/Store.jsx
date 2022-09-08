import { configureStore } from "@reduxjs/toolkit";
import LikeSlice from "./LikeSlice";
import ProductsSlice from "./ProductsSlice";


export const store = configureStore({
    reducer: {
        products: ProductsSlice,
        like: LikeSlice,
    },
});