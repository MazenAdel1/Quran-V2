import { configureStore } from "@reduxjs/toolkit";
import filter from "./filter/filterSlice";
import bookmarks from "./bookmarks/bookmarksSlice";
import theme from "./theme/themeSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      filter,
      bookmarks,
      theme,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
