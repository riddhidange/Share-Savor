import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  toast: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setToast: (state, action) => {
      state.toast = action.payload;
    },
  },
});

export const { setLoading, setToast } = appSlice.actions;

export default appSlice.reducer;
