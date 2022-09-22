import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import _ from "lodash";
import { getData } from "../../Services/getData";

export const getAsyncProducts = createAsyncThunk("products/getAsyncProducts", async (item, { rejectWithValue }) => {
    try {
        const response = await getData(item ? item : "");
        return response.data.length > 1 ? response.data.slice(0, 14) : response.data;
    } catch (error) {
        return rejectWithValue([], error)
    }
});

const initialState = {
    products: [],
    error: null,
    loading: false,
    search: [],
    filter: [],
    searchValue: "",
}


const ProductsSlice = createSlice({
    name: "products",
    initialState: initialState,
    extraReducers: {
        [getAsyncProducts.fulfilled]: (state, action) => {
            return { ...state, filter: action.payload, products: action.payload.length > 1 ? action.payload : [action.payload], search: action.payload, loading: false, error: null };
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
            state.products = state.search.filter((item) => {
                return (Object.values(item).join(item.category.name)).toLowerCase().includes(action.payload.toLowerCase());
            });
        },
        sort: (state, action) => {
            const value = action.payload;
            const sort = [...state.products];
            if (value === "lowest") {
                const asc = _.orderBy(sort, ["price"], ["asc"]);
                return { ...state, products: asc, search: asc }
            } else if (value === "highest") {
                const desc = _.orderBy(sort, ["price"], ["desc"]);
                return { ...state, products: desc, search: desc }
            }
        },

        setValueSearch: (state, action) => {
            return { ...state, searchValue: action.payload }
        },

        filter: (state, action) => {
            const value = action.payload;
            const filter = [...state.filter]
            if (action.payload === "All") {
                return { ...state, products: filter, search: filter }
            } else {
                const filterByCategory = filter.filter(item => item.category.name.toLowerCase().includes(value.toLowerCase()))
                return { ...state, products: filterByCategory, search: filterByCategory }
            }
        }
    },
}
)

export const { searchItem, sort, filter, setValueSearch } = ProductsSlice.actions;
export default ProductsSlice.reducer;

