import React, { useEffect } from "react";
import {
  Container,
  Button,
  Box,
  Card,
  Stack,
  CardMedia,
  CardActionArea,
  Typography,
  CardContent,
} from "@mui/material";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setRemovedBookIdRedux,
  getReadingList,
  removeReadingList,
} from "../service/readingSlice";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const ReadingPage = () => {
  const dispatch = useDispatch();
  const booksRedux = useSelector((state) => state.reading.books);
  const loadingRedux = useSelector((state) => state.reading.loading);
  const removedBookIdRedux = useSelector(
    (state) => state.reading.removedBookId
  );
  const navigate = useNavigate();

  const handleClickBook = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  const removeBook = (bookId) => {
    dispatch(setRemovedBookIdRedux(bookId));
  };

  useEffect(() => {
    dispatch(getReadingList({ removedBookIdRedux }));
  }, [removedBookIdRedux, dispatch]);

  useEffect(() => {
    dispatch(removeReadingList({ removedBookIdRedux }));
  }, [removedBookIdRedux, dispatch]);

  return (
    <Container>
      <Typography variant="h3" sx={{ textAlign: "center" }} m={3}>
        Book Store
      </Typography>
      {loadingRedux ? (
        <Box sx={{ textAlign: "center", color: "primary.main" }}>
          <ClipLoader color="inherit" size={150} loading={true} />
        </Box>
      ) : (
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-around"
          flexWrap={"wrap"}
        >
          {booksRedux?.map((book) => (
            <Card
              key={book.id}
              sx={{
                width: "12rem",
                height: "27rem",
                marginBottom: "2rem",
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={`${BACKEND_API}/${book.imageLink}`}
                  alt={`${book.title}`}
                  onClick={() => handleClickBook(book.id)}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {`${book.title}`}
                  </Typography>
                  <Typography gutterBottom variant="body1" component="div">
                    {`${book.author}`}
                  </Typography>
                  <Button
                    sx={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      backgroundColor: "secondary.light",
                      color: "secondary.contrastText",
                      padding: "0",
                      minWidth: "1.5rem",
                    }}
                    size="small"
                    onClick={() => removeBook(book.id)}
                  >
                    &times;
                  </Button>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default ReadingPage;
