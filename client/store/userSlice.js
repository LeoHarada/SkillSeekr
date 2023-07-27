import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleUser = createAsyncThunk("users/fetchSingleUser", async (userId) => {
    try {
        const response = await axios.get(`/api/users/${userId}`);
        return response.data;
    } catch (err) {
        console.error("Failed to fetch user:", err);
        throw err;
    }
});

export const updateUserAsync = createAsyncThunk("users/updateUser", async ({ ...userData }) => {
    try {
        const response = await axios.put(`/api/users/${userId}`, { ...userData });
        return response.data;
    } catch (err) {
        console.error("Failed to update user:", err);
        throw err;
    }
});

const userSlice = createSlice({
    name: "user",
    initialState: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSingleUser.fulfilled, (state, action) => {
            return action.payload;
        });
        builder.addCase(updateUserAsync.fulfilled, (state, action) => {
            return action.payload;
        });
    }
});

export const selectUser = (state) => {
    return state.user;
}

export default userSlice.reducer;