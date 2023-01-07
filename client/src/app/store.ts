import { configureStore } from "@reduxjs/toolkit";

import foldersReducer from "../features/folders/folderSlice";
import titleReducer from "../features/title/titleSlice";
import filterReducer from "../features/filters/filterSlice";

export const store = configureStore({
  reducer: {
    folders: foldersReducer,
    title: titleReducer,
    filter: filterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
