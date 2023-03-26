import React, { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import { Container, Button, Box, Grid, Stack, Typography } from "@mui/material";
import { setAddingBookRedux } from "../service/bookDetailSlice";
import { useSelector, useDispatch } from "react-redux";
import { getBook, postBook } from "../service/bookDetailSlice";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const BookDetailPage = () => {
  const dispatch = useDispatch();
  const loadingRedux = useSelector((state) => state.bookDetail.loading);
  const bookRedux = useSelector((state) => state.bookDetail.book);
  const addingBookRedux = useSelector((state) => state.bookDetail.addingBook);
  const params = useParams();
  const bookId = params.id;

  const addToReadingList = (book) => {
    dispatch(setAddingBookRedux(book));
  };

  useEffect(() => {
    dispatch(postBook({ addingBookRedux }));
  }, [addingBookRedux, dispatch]);

  useEffect(() => {
    dispatch(getBook({ bookId }));
  }, [bookId, dispatch]);

  return (
    <Container>
      {loadingRedux ? (
        <Box sx={{ textAlign: "center", color: "primary.main" }}>
          <ClipLoader color="#inherit" size={150} loading={true} />
        </Box>
      ) : (
        <Grid
          container
          spacing={2}
          p={4}
          mt={5}
          sx={{ border: "1px solid black" }}
        >
          <Grid item md={4}>
            {bookRedux && (
              <img
                width="100%"
                src={`${BACKEND_API}/${bookRedux.imageLink}`}
                alt=""
              />
            )}
          </Grid>
          <Grid item md={8}>
            {bookRedux && (
              <Stack>
                <h2>{bookRedux.title}</h2>
                <Typography variant="body1">
                  <strong>Author:</strong> {bookRedux.author}
                </Typography>
                <Typography variant="body1">
                  <strong>Year:</strong> {bookRedux.year}
                </Typography>
                <Typography variant="body1">
                  <strong>Country:</strong> {bookRedux.country}
                </Typography>
                <Typography variant="body1">
                  <strong>Pages:</strong> {bookRedux.pages}
                </Typography>
                <Typography variant="body1">
                  <strong>Language:</strong> {bookRedux.language}
                </Typography>
                <Button
                  variant="outlined"
                  sx={{ width: "fit-content" }}
                  onClick={() => addToReadingList(bookRedux)}
                >
                  Add to Reading List
                </Button>
              </Stack>
            )}
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default BookDetailPage;
