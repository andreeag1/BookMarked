import * as React from "react";
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

export default function CurrentlyReading({ setBooksRead }) {
  const [currentRead, setCurrentRead] = React.useState(<BookCard />);
  const [open, setOpen] = React.useState(false);
  const [secondOpen, setSecondOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [search, setSearch] = React.useState("");
  const [progress, setProgress] = React.useState(0);
  const [update, setUpdate] = React.useState(0);
  const [myBool, setmyBool] = React.useState(true);
  const [value, setValue] = React.useState(0);
  const [booksCompleted, setBooksCompleted] = React.useState(0);
  const [searchedBookInfo, setSearchedBookInfo] = React.useState([]);

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (e) => {
    setCurrentRead(e.target.book);
    setOpen(false);
    setmyBool(!myBool);
  };

  function toggleBool() {
    setmyBool(!myBool);
  }

  const handleUpdate = () => {
    setOpen(false);
    setProgress(update);
  };

  const handleFinished = () => {
    setOpen(false);
    setSecondOpen(true);
  };

  const handleSecondClose = () => {
    setSecondOpen(false);
  };

  const handleDone = () => {
    setSecondOpen(false);
    setmyBool(!myBool);
    setProgress(0);
    setBooksRead(booksCompleted + 1);
    setBooksCompleted(booksCompleted + 1);
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
            if (book.author_name && book.title) {
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
          <div className="book-image">
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
                <div className="bookcard">
                  <BookCard book={book} onClick={handleClick} />
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
            <img src={data[0].imageLink} className="image-link" />
          </div>

          <div className="book-info-container">
            <span style={{ fontWeight: "bold" }} className="book-name">
              {data[0].title}
            </span>
            <span style={{ fontWeight: "bold" }} className="book-name">
              {data[0].author}
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
              <h6>Give {data[0].title} a rating!</h6>
              <div>
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </div>

              <TextField
                fullWidth
                label="Write a review!"
                id="fullWidth"
                inputProps={{
                  style: {
                    height: "300px",
                  },
                }}
                multiline
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
