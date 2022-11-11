import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getResources = createAsyncThunk("fetch/getResource", async () => {
  const response = await fetch("http://localhost:5000/resources");
  return await response.json();
});

export const getEvents = createAsyncThunk("fetch/getEvents", async () => {
  const response = await fetch("http://localhost:5000/events");
  return await response.json();
});

const initialState: Counters.FetchInitialState = {
  isLoading: false,
  resources: [],
  events: [],
};

const fetchSlice = createSlice({
  name: "fetch",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    // FETCH EVENTS

    build.addCase(getEvents.pending, (state) => {
      state.isLoading = true;
    });

    build.addCase(getEvents.fulfilled, (state, action) => {
      state.isLoading = false;
      state.events = action.payload;
    });
    build.addCase(getEvents.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action);
    });

    // FETCH RESOURCES

    build.addCase(getResources.pending, (state) => {
      state.isLoading = true;
    });

    build.addCase(getResources.fulfilled, (state, action) => {
      state.isLoading = false;
      state.resources = action.payload;
    });

    build.addCase(getResources.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.error);
    });
  },
});

export default fetchSlice;
