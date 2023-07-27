import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleUser = createAsyncThunk("users/fetchSingleUser", async (id) => {
  try {
    const { data } = await axios.get(`/api/users/${id}`);
    return data;
  } catch (err) {
    console.error("Failed to fetch user:", err);
    throw err;
  }
});

export const fetchAllUsers = createAsyncThunk("users/fetchAllUsers", async () => {
    try {
      const { data } = await axios.get('/api/users');
      return data;
    } catch (err) {
      console.error("Failed to fetch user:", err);
      throw err;
    }
  });

export const updateUserAsync = createAsyncThunk("users/updateUser", async ({ token, id, userData }) => {
  try {
    const { data } = await axios.put(`/api/users/${id}`, userData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
  } catch (err) {
    console.error("Failed to update user:", err);
    throw err;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    users: [],
    loading:false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleUser.pending, (state) => {
        state.loading = true;
        state.error = null;
    });
    builder.addCase(fetchSingleUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
    });
    builder.addCase(fetchSingleUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    });
    builder.addCase(fetchAllUsers.pending, (state, action) => {
        state.loading = true;
        state.error = null;
    });
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
    });
    builder.addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    });
    builder.addCase(updateUserAsync.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      });
    builder.addCase(updateUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
    });
    builder.addCase(updateUserAsync.rejected, (state, action) => {
        state.loading = false;    
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;