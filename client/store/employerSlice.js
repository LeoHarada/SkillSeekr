import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleEmployer = createAsyncThunk("employers/fetchSingleEmployer", async (id) => {
  try {
    const { data } = await axios.get(`/api/employers/${id}`);
    return data;
  } catch (err) {
    console.error("Failed to fetch employer:", err);
    throw err;
  }
});

export const fetchAllEmployers = createAsyncThunk("employers/fetchAllEmployers", async () => {
    try {
      const { data } = await axios.get('/api/employers');
      return data;
    } catch (err) {
      console.error("Failed to fetch employers:", err);
      throw err;
    }
  });

export const updateEmployerAsync = createAsyncThunk("employers/updateEmployer", async ({ token, id, employerData }) => {
  try {
    const { data } = await axios.put(`/api/employers/${id}/edit`, employerData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
  } catch (err) {
    console.error("Failed to update employer:", err);
    throw err;
  }
});

const employerSlice = createSlice({
  name: "employer",
  initialState: {
    employer: null,
    employers: [],
    loading:false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleEmployer.pending, (state) => {
        state.loading = true;
        state.error = null;
    });
    builder.addCase(fetchSingleEmployer.fulfilled, (state, action) => {
        state.loading = false;
        state.employer = action.payload;
    });
    builder.addCase(fetchSingleEmployer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    });
    builder.addCase(fetchAllEmployers.pending, (state, action) => {
        state.loading = true;
        state.error = null;
    });
    builder.addCase(fetchAllEmployers.fulfilled, (state, action) => {
        state.loading = false;
        state.employers = action.payload;
    });
    builder.addCase(fetchAllEmployers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    });
    builder.addCase(updateEmployerAsync.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      });
    builder.addCase(updateEmployerAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.employer = action.payload.employer;
    });
    builder.addCase(updateEmployerAsync.rejected, (state, action) => {
        state.loading = false;    
        state.error = action.payload;
      });
  },
});

export default employerSlice.reducer;