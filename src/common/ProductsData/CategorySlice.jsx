import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import _ from "lodash";
import { getCategory } from "../../Services/getCategory";

export const getAsyncCategories = createAsyncThunk("categories/getAsyncCategories", async (data, { rejectWithValue }) => {
    try {
        const response = await getCategory(data);
        return response.data.slice(0, 5);
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
        searchCategory: (state, action) => {
            state.categories = state.search.filter(item => item.name.toLowerCase().includes(action.payload.toLowerCase()))
        },

    }
},
)

export const { searchCategory } = CategoriesSlice.actions;
export default CategoriesSlice.reducer;

