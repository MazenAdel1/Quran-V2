import { configureStore } from "@reduxjs/toolkit";
import filter from "./filter/filterSlice";
import bookmarks from "./bookmarks/bookmarksSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      filter,
      bookmarks,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
