import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { KPI } from "@/types";

interface KPIState {
  kpis: KPI[];
  selectedKPI: KPI | null;
  favoriteKPIs: string[];
  isLoading: boolean;
  error: string | null;
}

const initialState: KPIState = {
  kpis: [],
  selectedKPI: null,
  favoriteKPIs: [],
  isLoading: false,
  error: null,
};

const kpiSlice = createSlice({
  name: "kpi",
  initialState,
  reducers: {
    setKPIs: (state, action: PayloadAction<KPI[]>) => {
      state.kpis = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setSelectedKPI: (state, action: PayloadAction<KPI | null>) => {
      state.selectedKPI = action.payload;
    },
    addFavoriteKPI: (state, action: PayloadAction<string>) => {
      if (!state.favoriteKPIs.includes(action.payload)) {
        state.favoriteKPIs.push(action.payload);
      }
    },
    removeFavoriteKPI: (state, action: PayloadAction<string>) => {
      state.favoriteKPIs = state.favoriteKPIs.filter(
        (id: string) => id !== action.payload
      );
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
  setKPIs,
  setSelectedKPI,
  addFavoriteKPI,
  removeFavoriteKPI,
  setLoading,
  setError,
} = kpiSlice.actions;

export default kpiSlice.reducer;
