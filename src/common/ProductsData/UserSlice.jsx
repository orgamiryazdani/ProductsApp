import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: false,
    dataUser: [],
}

const UserSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        loginUser: (state, action) => {
            return {
                ...state,
                dataUser: action.payload
            };
        },
        setLoginUser: (state, action) => {
            return {
                ...state,
                user: action.payload
            };
        },
    }

})

export const { loginUser, setLoginUser } = UserSlice.actions;

export default UserSlice.reducer;