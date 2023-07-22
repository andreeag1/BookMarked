import React, { useEffect, useRef } from "react";
import "./currentlyReading.css";
import AddIcon from "@mui/icons-material/Add";
import {
  IconButton,
  Dialog,
  Button,
  TextField,
  Box,
  Typography,
  Rating,
  Autocomplete,
} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import data from "../../mock.json";
import BookCard from "../book-card/BookCard.js";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import {
  getCurrentUserId,
  addCurrentRead,
  getCurrentRead,
  removeCurrentRead,
  addProgressToCurrentRead,
  addProgressToYearlyGoal,
} from "../../modules/user/userRepository";
import { createBook, getBookByImg } from "../../modules/books/bookRepository";
import {
  getCollectionTitles,
  addBookToCollection,
  getCollection,
} from "../../modules/collection/collectionRepository";
import { addReview } from "../../modules/review/reviewRepository";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#cab9a9"),
  backgroundColor: "#cab9a9",
  "&:hover": {
    backgroundColor: "#cab9a9",
  },
}));

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#e1d5ca",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#cab9a9",
  },
}));

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <StyledLinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

const useDidMountEffect = (saveBook, bookInfo) => {
  const didMount = useRef(false);
  React.useEffect(() => {
    if (didMount.current) {
      saveBook();
    } else {
      didMount.current = true;
    }
  }, [bookInfo]);
};

export default function CurrentlyReading({ setBooksRead }) {
  const [open, setOpen] = React.useState(false);
  const [secondOpen, setSecondOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [search, setSearch] = React.useState("");
  const [progress, setProgress] = React.useState(0);
  const [update, setUpdate] = React.useState(0);
  const [myBool, setMyBool] = React.useState(true);
  const [booksCompleted, setBooksCompleted] = React.useState(0);
  const [searchedBookInfo, setSearchedBookInfo] = React.useState([]);
  const [bookInfo, setBookInfo] = React.useState([]);
  const [confirmedBookInfo, setConfirmedBookInfo] = React.useState([]);
  const [noCurrentRead, setNoCurrentRead] = React.useState(true);
  const [bookRemoved, setBookRemoved] = React.useState(false);
  const [collections, setCollections] = React.useState([]);
  const [newReview, setNewReview] = React.useState(false);
  const [review, setReview] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const [book, setBook] = React.useState([]);
  const [addToCollection, setAddToCollection] = React.useState("");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    const saveBook = async () => {
      if (bookRemoved == true) {
        const currentRead = await addCurrentRead(
          bookInfo.title,
          bookInfo.author,
          bookInfo.imageLink
        );
        console.log(currentRead);
        setConfirmedBookInfo({
          title: bookInfo.title,
          author: bookInfo.author,
          imageLink: bookInfo.imageLink,
        });
        setMyBool(false);
      }
    };
    saveBook();
  }, [bookInfo]);

  React.useEffect(() => {
    const currentRead = async () => {
      const existingCurrentRead = await getCurrentRead();
      console.log(existingCurrentRead);
      if ((await getCurrentRead()) == null) {
        setMyBool(true);
      } else {
        setMyBool(false);
        console.log(existingCurrentRead);
        setConfirmedBookInfo({
          title: existingCurrentRead.title,
          author: existingCurrentRead.author,
          imageLink: existingCurrentRead.imageLink,
        });
        setProgress(existingCurrentRead.progress);
      }
    };
    currentRead();
  }, [noCurrentRead]);

  useDidMountEffect(() => {
    console.log("second render");
  });

  const handleClick = async () => {
    setBookRemoved(true);
    setOpen(false);
  };

  useEffect(() => {
    const saveProgress = async () => {
      addProgressToCurrentRead(progress);
    };
    saveProgress();
  }, [progress]);

  const handleUpdate = async () => {
    setProgress(update);
    setOpen(false);
  };

  useEffect(() => {
    const newCollection = async () => {
      const userId = await getCurrentUserId();
      const userCollections = await getCollectionTitles(userId);
      const titles = [];
      userCollections.map((collection) => {
        if (collection.title == "Read" || collection.title == "Want To Read") {
        } else {
          titles.push(collection.title);
        }
      });
      console.log(titles);
      setCollections(titles);
    };
    newCollection();
  }, [newReview]);

  const handleFinished = async () => {
    setOpen(false);
    setSecondOpen(true);
    setNewReview(true);
    setBook(
      await createBook(
        confirmedBookInfo.title,
        confirmedBookInfo.author,
        confirmedBookInfo.imageLink
      )
    );
    console.log(book);
  };

  const handleSecondClose = () => {
    setSecondOpen(false);
  };

  const handleDone = async () => {
    if (review == "" || rating == 0) {
      alert("Please enter a review and a rating");
      handleFinished();
    } else {
      const userId = await getCurrentUserId();
      removeCurrentRead(userId);
      setSecondOpen(false);
      setNoCurrentRead(true);
      setMyBool(true);
      setProgress(0);
      setBooksRead(booksCompleted + 1);
      setBooksCompleted(booksCompleted + 1);
      await addProgressToYearlyGoal(booksCompleted + 1);
      if (book == null) {
        const cover = confirmedBookInfo.imageLink.replaceAll("/", "_");
        const findBook = await getBookByImg(cover);
        console.log(findBook);
        console.log(addToCollection);
        if (addToCollection == "") {
        } else {
          const collectionId = await getCollection(userId, addToCollection);
          console.log(collectionId.id);
          await addBookToCollection(collectionId.id, findBook.id);
        }
        const readCollection = await getCollection(userId, "Read");
        await addBookToCollection(readCollection.id, findBook.id);
        const createNewReview = await addReview(
          review,
          findBook.id,
          userId,
          rating
        );
      } else {
        console.log(addToCollection);
        if (addToCollection == "") {
        } else {
          const collectionId = await getCollection(userId, addToCollection);
          console.log(collectionId.id);
          await addBookToCollection(collectionId.id, book.id);
        }
        const readCollection = await getCollection(userId, "Read");
        await addBookToCollection(readCollection.id, book.id);
        const createNewReview = await addReview(
          review,
          book.id,
          userId,
          rating
        );
      }
    }
  };

  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      fetch(
        "https://openlibrary.org/search.json?" +
          new URLSearchParams({
            q: search,
          })
      )
        .then((response) => response.json())
        .then((data) => {
          const books = data.docs.map((book) => {
            if (book.author_name && book.title && book.key && book.cover_i) {
              const Obj = {
                title: book.title,
                author: book.author_name[0],
                imageLink: `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`,
              };
              return Obj;
            }
          });
          const filteredArray = books.filter(function (element) {
            return element !== undefined;
          });
          console.log(filteredArray);
          setSearchedBookInfo(filteredArray);
        });
    }
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open, searchedBookInfo]);

  return myBool ? (
    <div className="container">
      <div className="current-read">
        <h5>Currently Reading</h5>
        <div className="book-info">
          <div className="book-imagee">
            <IconButton onClick={handleClickOpen("paper")}>
              <AddIcon className="add-icon" sx={{ fontSize: "45px" }} />
            </IconButton>
          </div>
          <h7>What are you reading?</h7>
        </div>
      </div>
      <div className="dialog-container">
        <Dialog
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          fullWidth
          maxWidth="md"
          PaperProps={{
            sx: {
              width: "50%",
              height: 700,
            },
          }}
        >
          <DialogTitle id="scroll-dialog-title">
            What is your current read?
          </DialogTitle>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            placeholder="Search books"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSubmit}
          />
          <DialogContent dividers={scroll === "paper"}>
            <div className="map">
              {searchedBookInfo?.map((book) => (
                <div className="bookcard" onClick={handleClick}>
                  <BookCard
                    book={book}
                    onClick={() => {
                      setBookInfo({
                        title: book.title,
                        author: book.author,
                        imageLink: book.imageLink,
                      });
                    }}
                  />
                </div>
              ))}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  ) : (
    <div className="container">
      <div className="current-read-info">
        <div className="title-contianer">
          <h5>Currently Reading</h5>
        </div>
        <div className="book-information">
          <div className="book-img">
            <img src={confirmedBookInfo.imageLink} className="image-link" />
          </div>

          <div className="book-info-container">
            <span style={{ fontWeight: "bold" }} className="book-name">
              {confirmedBookInfo.title}
            </span>
            <span style={{ fontWeight: "bold" }} className="book-name">
              {confirmedBookInfo.author}
            </span>
            <div className="progress-wrapper">
              <LinearProgressWithLabel variant="determinate" value={progress} />
            </div>
            <div className="progress-btn">
              <ColorButton onClick={handleClickOpen("paper")}>
                Update Progress
              </ColorButton>
            </div>
          </div>
        </div>
      </div>
      <div className="second-dialog-container">
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          maxWidth="md"
          PaperProps={{
            sx: {
              width: "21%",
              height: 200,
            },
          }}
        >
          <DialogTitle>Update your progress</DialogTitle>
          <DialogContent>
            <div className="update">
              <h6>I'm currently</h6>
              <TextField
                id="outlined-basic"
                variant="filled"
                type="number"
                sx={{ width: "60px" }}
                onChange={(e) => setUpdate(e.target.value)}
              />
              <h6>% done</h6>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleFinished}>Finished?</Button>
            <Button onClick={handleUpdate}>Update</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className="second-dialog-container">
        <Dialog
          open={secondOpen}
          onClose={handleSecondClose}
          fullWidth
          maxWidth="md"
          PaperProps={{
            sx: {
              width: "50%",
              height: 500,
            },
          }}
        >
          <DialogTitle>Congrats!</DialogTitle>
          <DialogContent>
            <div className="update">
              <h6>Give {confirmedBookInfo.title} a rating!</h6>
              <div className="rate">
                <div className="rating">
                  <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={(event, newValue) => {
                      setRating(newValue);
                    }}
                  />
                </div>

                <div className="collections">
                  <Autocomplete
                    freeSolo
                    id="combo-box-demo"
                    options={collections.map((option) => option)}
                    sx={{ width: 250 }}
                    onChange={(e) => {
                      setAddToCollection(e.target.textContent);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Add to a collection" />
                    )}
                  />
                </div>
              </div>

              <TextField
                fullWidth
                label="Write a review!"
                id="fullWidth"
                inputProps={{
                  style: {
                    height: "270px",
                  },
                }}
                multiline
                onChange={(e) => {
                  setReview(e.target.value);
                }}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDone}>Update</Button>
            <Button onClick={handleSecondClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
