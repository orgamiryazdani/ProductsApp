import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "../../Services/getData";

export const getAsyncProducts = createAsyncThunk("products/getAsyncProducts", async (_, { rejectWithValue }) => {
    try {
        const response = await getData("products");
        return response.data.slice(0, 14);
    } catch (error) {
        return rejectWithValue([], error)
    }
});

const initialState = {
    products: [],
    error: null,
    loading: false,
    search: [],
}


const ProductsSlice = createSlice({
    name: "products",
    initialState: initialState,
    extraReducers: {
        [getAsyncProducts.fulfilled]: (state, action) => {
            return { ...state, products: action.payload, search: action.payload, loading: false, error: null };
        },
        [getAsyncProducts.pending]: (state, action) => {
            return { ...state, products: [], search: [], loading: true, error: null };
        },
        [getAsyncProducts.rejected]: (state, action) => {
            return { ...state, products: [], search: [], loading: false, error: action.error.message };
        },
    },
    reducers: {
        searchItem: (state, action) => {
            state.products = state.search.filter(item => item.category.name.toLowerCase().includes(action.payload.toLowerCase()))
        },
    },
}
)

export const { searchItem } = ProductsSlice.actions;
export default ProductsSlice.reducer;

