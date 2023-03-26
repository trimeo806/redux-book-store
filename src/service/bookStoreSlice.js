import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../apiService";

const initialState = {
  books: [],
  pageNum: 1,
  loading: false,
  query: "",
  errorMessage: "",
  status: "",
  error: "",
};

export const getBooks = createAsyncThunk("counter/getBooks", async (state) => {
  let url = `/books?_page=${state.pageNumRedux}&_limit=${state.limit}`;
  if (state.queryRedux) {
    url += `&q=${state.queryRedux}`;
  }
  console.log(state);
  const res = await api.get(url);
  return res.data;
});

export const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooksRedux: (state, action) => {
      state.books = action.payload;
    },
    setPageNumRedux: (state, action) => {
      state.pageNum = action.payload;
    },
    setLoadingRedux: (state, action) => {
      state.loading = action.payload;
    },
    setErrorMessageRedux: (state, action) => {
      state.errorMessage = action.payload;
    },
    setQueryRedux: (state, action) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.status = "idle";
        state.books = action.payload;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  setBooksRedux,
  setPageNumRedux,
  setLoadingRedux,
  setErrorMessageRedux,
  setQueryRedux,
} = bookSlice.actions;
export default bookSlice.reducer;
