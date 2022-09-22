import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
    sort: []
}


const sortSlice = createSlice({
    name: "sort",
    initialState: initialState,
    reducers: {
        setSort: (state, action) => {
            return { ...state, sort: action.payload }
        },
        sorts: (state, action) => {
            const {value} = action.payload;
            const sort = [...state.sort];
            if (value === "lowest") {
                const asc = _.orderBy(sort, ["price"], ["asc"]);
                return { ...state, sort: asc }
            } else {
                const desc = _.orderBy(sort, ["price"], ["desc"]);
                return { ...state, sort: desc }
            }
        },

    },
}
)

export const { sorts, setSort } = sortSlice.actions;
export default sortSlice.reducer;

