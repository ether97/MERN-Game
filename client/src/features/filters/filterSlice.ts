import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface filterState {
  value: boolean;
}

const initialState = { value: false } as filterState;

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<boolean>) {
      state.value = action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
