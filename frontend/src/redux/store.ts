import { configureStore } from "@reduxjs/toolkit";
import fetchCounters from "./counters/fetchCounters";

const store = configureStore({
  reducer: {
    fetch: fetchCounters.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
