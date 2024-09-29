import { configureStore } from "@reduxjs/toolkit";
import kpiReducer from "./kpiSlice";
import layoutReducer from "./layoutSlice";

export const store = configureStore({
  reducer: {
    kpi: kpiReducer,
    layout: layoutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
