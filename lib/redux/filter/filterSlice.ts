import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type FilterProps = {
  id: "surahs" | "juzs" | "bookmarks";
  title: "سور" | "أجزاء" | "مرجعيات";
};

type Props = {
  id: FilterProps["id"];
  title: FilterProps["title"];
  active: boolean;
}[];

const initialState: { value: Props } = {
  value: [
    { id: "surahs", title: "سور", active: true },
    { id: "juzs", title: "أجزاء", active: false },
    { id: "bookmarks", title: "مرجعيات", active: false },
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
