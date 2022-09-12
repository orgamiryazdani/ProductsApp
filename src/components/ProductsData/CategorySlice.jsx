import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategory } from "../../Services/getCategory";

export const getAsyncCategories = createAsyncThunk("categories/getAsyncCategories", async (_, { rejectWithValue }) => {
    try {
        const response = await getCategory("categories");
        return response.data;
    } catch (error) {
        return rejectWithValue([], error)
    }
}
);

const initialState = {
    categories: [],
    error: null,
    loading: false,
    search: [],
}


const CategoriesSlice = createSlice({
    name: "categories",
    initialState: initialState,
    extraReducers: {
        [getAsyncCategories.fulfilled]: (state, action) => {
            return { ...state, categories: action.payload, search: action.payload, loading: false, error: null };
        },
        [getAsyncCategories.pending]: (state, action) => {
            return { ...state, categories: [], search: [], loading: true, error: null };
        },
        [getAsyncCategories.rejected]: (state, action) => {
            return { ...state, categories: [], search: [], loading: false, error: action.error.message };
        },
    },
    reducers: {
        searchItem: (state, action) => {
            state.categories = state.search.filter(item => item.name.toLowerCase().includes(action.payload.toLowerCase()))
        },
    },
}
)

export const { searchItem } = CategoriesSlice.actions;
export default CategoriesSlice.reducer;

