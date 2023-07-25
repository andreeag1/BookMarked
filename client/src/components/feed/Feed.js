import React, { useEffect, useRef } from "react";
import "./Feed.css";
import profilePic from "../../assets/pictures/profile.png";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BookCard from "../book-card/BookCard";
import likeIcon from "../../assets/pictures/like.png";
import {
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  Rating,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { storage } from "../../firebase.js";
import { ref, getDownloadURL } from "firebase/storage";
import {
  addLike,
  deleteLike,
  getReviewById,
  deleteReview,
} from "../../modules/review/reviewRepository";
import {
  addComment,
  getCommentsByReview,
  getCommentCount,
  deleteComment,
} from "../../modules/comment/commentRepository";
import { getBookByImg, createBook } from "../../modules/books/bookRepository";
import { getCurrentUserId } from "../../modules/user/userRepository";
import {
  getCollection,
  addBookToCollection,
  deleteBookFromCollection,
  getCollectionById,
} from "../../modules/collection/collectionRepository";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#E9E7E5"),
  backgroundColor: "#cab9a9",
  "&:hover": {
    backgroundColor: "#cab9a9",
  },
}));

const TouchedColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#E9E7E5"),
  backgroundColor: "#DDDDDD",
  "&:hover": {
    backgroundColor: "#DDDDDD",
  },
}));

const StyledTextfield = styled(TextField)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Feed({ user, book, description, review }) {
  const [like, setLike] = React.useState(0);
  const [isLiked, setIsLiked] = React.useState(true);
  const [array, setArray] = React.useState([]);
  const [openComments, setOpenComments] = React.useState(false);
  const [touched, setTouched] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const [commentInfo, setCommentInfo] = React.useState([]);
  const [commentCount, setCommentCount] = React.useState(0);
  const [url, setUrl] = React.useState([]);
  const [currentUserUrl, setCurrentUserUrl] = React.useState(null);
  const [addedComment, setAddedComment] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showKebeb, setShowKebab] = React.useState(false);
  const [commentToDelete, setCommentToDelete] = React.useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getlikes = async () => {
      const newReview = await getReviewById(review.id);
      setLike(newReview.likes);
      const userId = await getCurrentUserId();
      if (user.id == userId) {
        setShowKebab(true);
      }
    };

    getlikes();
  }, [array]);

  useEffect(() => {
    const getProfilePictures = async () => {
      const imageRef = ref(storage, user.id);
      const userId = await getCurrentUserId();
      const secondImageRef = ref(storage, userId);
      getDownloadURL(imageRef)
        .then((url) => {
          setUrl(url);
        })
        .catch((error) => {
          setUrl(profilePic);
        });
      getDownloadURL(secondImageRef)
        .then((url) => {
          setCurrentUserUrl(url);
        })
        .catch((error) => {
          setCurrentUserUrl(profilePic);
        });
    };
    getProfilePictures();
  }, [array]);

  useEffect(() => {
    const getComments = async () => {
      const authorized = await getCurrentUserId();
      if (authorized) {
        const comments = await getCommentsByReview(review.id);
        const totalComments = [];
        comments.map((comment) => {
          const imageRef = ref(storage, comment.user.id);
          getDownloadURL(imageRef)
            .then((url) => {
              const Obj = {
                info: comment,
                url: url,
              };
              totalComments.push(Obj);
            })
            .catch(() => {
              const Obj = {
                info: comment,
                url: profilePic,
              };
              totalComments.push(Obj);
            });
        });

        setCommentInfo(totalComments);
        const count = await getCommentCount(review.id);
        setCommentCount(count);
      } else {
        navigate("/login");
      }
    };

    getComments();
  }, [addedComment]);

  const likeHandler = async () => {
    const authorized = await getCurrentUserId();
    if (authorized) {
      if (isLiked == true) {
        await addLike(review.id);
        const newReview = await getReviewById(review.id);
        setLike(newReview.likes);
        setIsLiked(false);
      } else if (isLiked == false) {
        await deleteLike(review.id);
        const newReview = await getReviewById(review.id);
        setLike(newReview.likes);
        setIsLiked(true);
      }
    } else {
      navigate("/login");
    }
  };

  const commentHandler = async () => {
    setOpenComments(!openComments);
  };

  const handleClick = () => {
    setTouched(true);
  };

  const addCommentHandler = async () => {
    const userId = await getCurrentUserId();
    if (userId) {
      await addComment(comment, userId, review.id);
      setComment("");
      setAddedComment(!addedComment);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    const isBookInCollection = async () => {
      const userId = await getCurrentUserId();
      const collection = await getCollection(userId, "Want To Read");
      const books = await getCollectionById(collection.id);
      books.books.map((newBook) => {
        if (newBook.imageLink == book.imageLink) {
          setPressed(true);
        }
      });
    };
    isBookInCollection();
  });

  const handleWantToRead = async () => {
    const userId = await getCurrentUserId();
    if (userId) {
      const collection = await getCollection(userId, "Want To Read");
      const cover = book.imageLink.replaceAll("/", "_");
      const newBook = await createBook(book.title, book.author, book.imageLink);
      if (pressed == false) {
        if (newBook == null) {
          const findBook = await getBookByImg(cover);
          await addBookToCollection(collection.id, findBook.id);
          setPressed(true);
        } else {
          await addBookToCollection(collection.id, newBook.id);
          setPressed(true);
        }
      } else {
        if (newBook == null) {
          const findBook = await getBookByImg(cover);
          await deleteBookFromCollection(collection.id, findBook.id);
          setPressed(false);
        } else {
          await deleteBookFromCollection(collection.id, newBook.id);
          setPressed(false);
        }
      }
    } else {
      navigate("/login");
    }
  };

  const handlePopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDelete = async () => {
    const authorized = await getCurrentUserId();
    if (authorized) {
      setAnchorEl(null);
      await deleteReview(review.id);
      window.location.reload();
    } else {
      navigate("/login");
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    const handleDeleteComment = async () => {
      const authorized = await getCurrentUserId();
      if (authorized) {
        setAnchorEl(null);
        await deleteComment(commentToDelete);
        setAddedComment(!addedComment);
      } else {
        navigate("/login");
      }
    };

    handleDeleteComment();
  }, [commentToDelete]);

  return (
    <div className="feed">
      <div className="posts-section">
        <div className="post">
          <div className="postWrapper">
            <div className="postTop">
              <div className="postTopLeft">
                <Link to={`/profile/${user.id}`}>
                  <img className="postProfileImg" src={url} alt="" />
                  <span className="postUsername">
                    {user.firstName} {user.lastName}
                  </span>
                </Link>

                <span className="postUsername">reviewed</span>
                <span className="postUsername">{book.title}</span>
                <span className="postDate">{review.date}</span>
              </div>
              <div className="postTopRight">
                {showKebeb ? (
                  <div>
                    <Button>
                      <MoreVertIcon onClick={handlePopover} />
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={handleDelete}>Delete Post</MenuItem>
                    </Menu>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          <div className="postReview">
            <div className="post-rating">
              <Rating readOnly value={4} />
            </div>
            <h7 className="postText">{review.review}</h7>
          </div>
          <Divider variant="middle" sx={{ width: "95%", bgcolor: "black" }} />

          <div className="postCenter">
            <div className="bookCard">
              <BookCard book={book} />
            </div>

            <div className="bookSummary">
              <div className="WantToReadBtn">
                {pressed ? (
                  <TouchedColorButton onClick={handleWantToRead}>
                    Want to Read
                  </TouchedColorButton>
                ) : (
                  <ColorButton onClick={handleWantToRead}>
                    Want to Read
                  </ColorButton>
                )}
              </div>
              <h5>Summary</h5>
              <Box className="description">{description}</Box>
            </div>
          </div>

          <div className="postBottom">
            <div className="postBottomLeft">
              <img
                className="likeIcon"
                src={likeIcon}
                onClick={likeHandler}
                alt=""
              />
              <span className="postLikeCounter">{like} people like it</span>
            </div>
            <div className="postBottomRight">
              <span className="postCommentText" onClick={commentHandler}>
                {commentCount} comments
              </span>
            </div>
          </div>
          <div className="comments">
            {openComments ? (
              <div className="comment-section">
                {commentInfo.map((comment) => {
                  return (
                    <div className="comment">
                      <div className="comment-info">
                        <div>
                          <img
                            className="postProfileImg"
                            src={comment.url}
                            alt=""
                          />
                          <span className="postUsername">
                            {comment.info.user.firstName}{" "}
                            {comment.info.user.lastName} commented
                          </span>
                        </div>
                        <div className="kebab">
                          {showKebeb ? (
                            <div>
                              <Button>
                                <MoreVertIcon onClick={handlePopover} />
                              </Button>
                              <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                  "aria-labelledby": "basic-button",
                                }}
                              >
                                <MenuItem
                                  onClick={() =>
                                    setCommentToDelete(comment.info.id)
                                  }
                                >
                                  Delete Comment
                                </MenuItem>
                              </Menu>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                      <div className="comment-text">
                        <span>{comment.info.comment}</span>
                      </div>

                      <Divider
                        variant="middle"
                        sx={{
                          width: "95%",
                          bgcolor: "black",
                          marginTop: "0.5rem",
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <></>
            )}
            <div className="addComment">
              <div className="add-comment-section">
                <img className="postProfileImg" src={currentUserUrl} alt="" />
                <StyledTextfield
                  className="comment-box"
                  label="Write a comment..."
                  inputProps={{
                    style: {
                      width: "50%",
                      minWidth: "370px",
                      height: "0px",
                    },
                  }}
                  value={comment}
                  multiline
                  onClick={handleClick}
                  onChange={(e) => setComment(e.target.value)}
                />

                {touched ? (
                  <div className="comment-button-section">
                    <ColorButton
                      className="comment-button"
                      onClick={addCommentHandler}
                    >
                      Comment
                    </ColorButton>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
