import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../apiService";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  book: null,
  addingBook: null,
  status: "idle",
  error: "",
};

export const getBook = createAsyncThunk("counter/getBook", async (state) => {
  const res = await api.get(`/books/${state.bookId}`);
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
        state.loading = true;
      })
      .addCase(getBook.fulfilled, (state, action) => {
        state.status = "idle";
        state.book = action.payload;
        state.loading = false;
      })
      .addCase(getBook.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        toast.error(action.error?.message);
      });

    builder
      .addCase(postBook.pending, (state, action) => {
        state.status = "loading";
        state.loading = true;
        console.log(action);
      })
      .addCase(postBook.fulfilled, (state, action) => {
        state.status = "idle";
        state.addingBook = action.payload;
        state.loading = false;
      })
      .addCase(postBook.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        toast.error(action.error?.message);
      });
  },
});

export const { setLoadingRedux, setBookRedux, setAddingBookRedux } =
  bookDetailSlice.actions;
export default bookDetailSlice.reducer;
