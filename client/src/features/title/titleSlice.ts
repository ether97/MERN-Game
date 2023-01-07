import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface titleState {
  value: string;
}

const initialState = { value: "" } as titleState;

const titleSlice = createSlice({
  name: "title",
  initialState,
  reducers: {
    setTitle(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
  },
});

export const { setTitle } = titleSlice.actions;
export default titleSlice.reducer;
