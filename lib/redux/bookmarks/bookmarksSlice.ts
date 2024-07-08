import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: { value: { page: number }[] } = {
  value:
    (typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("bookmarks") as string)) ||
    [],
};

const updateLocalStorage = (value: typeof initialState.value) => {
  typeof window !== "undefined" &&
    localStorage.setItem("bookmarks", JSON.stringify(value));
};

export const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    addBookmark: (state, action: PayloadAction<{ page: number }>) => {
      state.value.push(action.payload);
      updateLocalStorage(state.value);
    },
    deleteBookmark: (state, action: PayloadAction<{ page: number }>) => {
      state.value = state.value.filter(
        (bookmark) => bookmark.page !== action.payload.page,
      );
      updateLocalStorage(state.value);
    },
    deleteAllBookmarks: (state) => {
      state.value = [];
      updateLocalStorage(state.value);
    },
  },
});

export const { addBookmark, deleteBookmark, deleteAllBookmarks } =
  bookmarksSlice.actions;

export default bookmarksSlice.reducer;
