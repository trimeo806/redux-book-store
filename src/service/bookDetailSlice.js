import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../apiService";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  book: null,
  addingBook: false,
  status: "idle",
  error: "",
};

export const getBook = createAsyncThunk("counter/getBook", async (state) => {
  const res = await api.get(`/books/${state.bookId}`);
  console.log(res.data);
  return res.data;
});
export const postBook = createAsyncThunk("counter/postBook", async (state) => {
  if (!state.addingBookRedux) return;
  await api.post(`/favorites`, state.addingBookRedux);
  toast.success("The book has been added to the reading list!");
});

export const bookDetailSlice = createSlice({
  name: "bookDetail",
  initialState,
  reducers: {
    setLoadingRedux: (state, action) => {
      state.loading = action.payload;
    },
    setBookRedux: (state, action) => {
      state.book = action.payload;
    },
    setAddingBookRedux: (state, action) => {
      state.addingBook = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBook.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBook.fulfilled, (state, action) => {
        state.status = "idle";
        state.book = action.payload;
        console.log(state.book);
      })
      .addCase(getBook.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(postBook.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postBook.fulfilled, (state, action) => {
        state.status = "idle";
        console.log(action);
        state.addingBook = action.payload;
        // console.log(state.book);
      })
      .addCase(postBook.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error(state.error);
      });
  },
});

export const { setLoadingRedux, setBookRedux, setAddingBookRedux } =
  bookDetailSlice.actions;
export default bookDetailSlice.reducer;
