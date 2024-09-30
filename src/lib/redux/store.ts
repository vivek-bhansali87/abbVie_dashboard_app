import { configureStore } from "@reduxjs/toolkit";
import kpiReducer from "./kpiSlice";
import layoutReducer from "./layoutSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      kpi: kpiReducer,
      layout: layoutReducer,
    },
  });

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
