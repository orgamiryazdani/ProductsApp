import { configureStore } from "@reduxjs/toolkit";
import CategorySlice from "./CategorySlice";
import LikeSlice from "./LikeSlice";
import ProductsSlice from "./ProductsSlice";
import sortSlice from "./Sort";
import UserSlice from "./UserSlice";


export const store = configureStore({
    reducer: {
        products: ProductsSlice,
        like: LikeSlice,
        categories: CategorySlice,
        user: UserSlice,
        sort: sortSlice
    },
});