import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../apiService";
import { toast } from "react-toastify";

const initialState = {
  books: [],
  loading: false,
  removedBookId: "",
  status: "idle",
  error: "",
};

export const getReadingList = createAsyncThunk(
  "counter/getReadingList",
  async (state) => {
    if (state.removedBookIdRedux) return;
    const res = await api.get(`/favorites`);
    console.log(res.data);
    return res.data;
  }
);
export const removeReadingList = createAsyncThunk(
  "counter/removeReadingList",
  async (state) => {
    if (!state.removedBookIdRedux) return;
    await api.delete(`/favorites/${state.removedBookIdRedux}`);
    toast.success("The book has been removed");
  }
);

export const readingSlice = createSlice({
  name: "reading",
  initialState,
  reducers: {
    setBooksRedux: (state, action) => {
      state.books = action.payload;
    },
    setLoadingRedux: (state, action) => {
      state.loading = action.payload;
    },
    setRemovedBookIdRedux: (state, action) => {
      state.removedBookId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReadingList.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(getReadingList.fulfilled, (state, action) => {
        state.status = "idle";
        state.books = action.payload;
        state.loading = false;
      })
      .addCase(getReadingList.rejected, (state, action) => {
        state.status = "failed";
        toast.error(action.error.message);
      });

    builder
      .addCase(removeReadingList.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(removeReadingList.fulfilled, (state, action) => {
        state.status = "idle";
        state.removedBookId = "";
        state.loading = false;
      })
      .addCase(removeReadingList.rejected, (state, action) => {
        state.status = "failed";
        toast.error(action.error.message);
      });
  },
});

export const { setBooksRedux, setLoadingRedux, setRemovedBookIdRedux } =
  readingSlice.actions;
export default readingSlice.reducer;
