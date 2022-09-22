import { createSlice } from "@reduxjs/toolkit";

const LikeSlice = createSlice({
    name: "like",
    initialState: { LikeProduct: [], search: [] },
    reducers: {
        addItemToCart: (state, action) => {

            const stateCart = state.LikeProduct;
            const stateSearch = state.search;

            const checkCart = stateCart.findIndex(
                (item) => item.id === action.payload.id
            )

            const checkSearch = stateSearch.findIndex(
                (item) => item.id === action.payload.id
            )

            if (checkCart < 0 && checkSearch < 0) {
                stateCart.push(action.payload);
                stateSearch.push(action.payload);
            } else {
                const filteredCart = stateCart.filter(
                    (item) => item.id !== action.payload.id
                );
                const filteredSearch = stateSearch.filter(
                    (item) => item.id !== action.payload.id
                );
                return {
                    ...state,
                    LikeProduct: filteredCart,
                    search: filteredSearch
                };
            };
        },

        searchItemLike: (state, action) => {
            state.LikeProduct = state.search.filter((item) => {
                return (Object.values(item).join(item.category.name)).toLowerCase().includes(action.payload.toLowerCase());
            });
        },
    }
})

export const { addItemToCart, searchItemLike } = LikeSlice.actions;

export default LikeSlice.reducer;