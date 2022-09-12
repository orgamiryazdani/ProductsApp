import { configureStore } from "@reduxjs/toolkit";
import CategorySlice from "./CategorySlice";
import LikeSlice from "./LikeSlice";
import ProductsSlice from "./ProductsSlice";


export const store = configureStore({
    reducer: {
        products: ProductsSlice,
        like: LikeSlice,
        categories: CategorySlice,
    },
});