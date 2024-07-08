import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type FilterProps = "سور" | "أجزاء" | "مرجعيات";

type Props = { title: FilterProps; active: boolean }[];

const initialState: { value: Props } = {
  value: [
    { title: "سور", active: true },
    { title: "أجزاء", active: false },
    { title: "مرجعيات", active: false },
  ],
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeFilter: (state, action: PayloadAction<Props>) => {
      state.value = action.payload;
    },
  },
});

export const { changeFilter } = filterSlice.actions;

export default filterSlice.reducer;
