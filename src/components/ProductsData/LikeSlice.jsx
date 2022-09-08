import { createSlice } from "@reduxjs/toolkit";

const LikeSlice = createSlice({
    name: "like",
    initialState: { LikeProduct: [] },
    reducers: {
        addItemToCart: (state, action) => {
            const stateCart = state.LikeProduct;
            const checkCart = stateCart.findIndex(
                (item) => item.id === action.payload.id
            )

            if (checkCart < 0) {
                stateCart.push(action.payload);
            } else {
                const filteredCart = stateCart.filter(
                    (item) => item.id !== action.payload.id
                );
                return {
                    ...state,
                    LikeProduct: filteredCart,
                };
            };
        },
    }
})

export const { addItemToCart } = LikeSlice.actions;

export default LikeSlice.reducer;