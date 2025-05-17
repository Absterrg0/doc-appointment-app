import { createSlice } from "@reduxjs/toolkit";
import { get } from "mongoose";
import { use } from "react";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
    },
    reducers: {
        // jaha error h kuch bea toh set user l=ka h pr buffer bi h kuch shayd
        setUser: (state, action) => {
            state.user = action.payload;
        },
    }
})

export const { setUser } = userSlice.actions;
