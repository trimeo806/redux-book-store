import { configureStore, combineReducers } from "@reduxjs/toolkit";
import bookStoreReducer from "../service/bookStoreSlice";
import bookDetailReducer from "../service/bookDetailSlice";
import readingReducer from "../service/readingSlice";

export const store = configureStore({
  reducer: combineReducers({
    bookStore: bookStoreReducer,
    bookDetail: bookDetailReducer,
    reading: readingReducer,
  }),
});
