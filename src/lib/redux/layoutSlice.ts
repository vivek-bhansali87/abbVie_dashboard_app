import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Layout } from "../../src/types";

interface LayoutState {
  layouts: Layout[];
  currentLayout: Layout | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: LayoutState = {
  layouts: [],
  currentLayout: null,
  isLoading: false,
  error: null,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setLayouts: (state, action: PayloadAction<Layout[]>) => {
      state.layouts = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    addLayout: (state, action: PayloadAction<Layout>) => {
      state.layouts.push(action.payload);
    },
    updateLayout: (state, action: PayloadAction<Layout>) => {
      const index = state.layouts.findIndex(
        (layout) => layout.id === action.payload.id
      );
      if (index !== -1) {
        state.layouts[index] = action.payload;
      }
    },
    setCurrentLaypout: (state, action: PayloadAction<Layout | null>) => {
      state.currentLayout = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  setLayouts,
  addLayout,
  updateLayout,
  setCurrentLaypout,
  setLoading,
  setError,
} = layoutSlice.actions;

export default layoutSlice.reducer;
