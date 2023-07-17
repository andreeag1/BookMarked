import React, { useEffect, useRef } from "react";
import "./Feed.css";
import profilePic from "../../assets/pictures/1.jpeg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BookCard from "../book-card/BookCard";
import data from "../../mock.json";
import likeIcon from "../../assets/pictures/like.png";
import heartIcon from "../../assets/pictures/heart.png";
import { Button, Divider, Rating, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import {
  addLike,
  deleteLike,
  getReviewById,
} from "../../modules/review/reviewRepository";
import {
  addComment,
  getCommentsByReview,
  getCommentCount,
} from "../../modules/comment/commentRepository";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#E9E7E5"),
  backgroundColor: "#DDDDDC",
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
  const userLiked = React.useRef(false);

  useEffect(() => {
    const getlikes = async () => {
      const newReview = await getReviewById(review.id);
      setLike(newReview.likes);
    };

    getlikes();
  }, [array]);

  useEffect(() => {
    const getComments = async () => {
      const comments = await getCommentsByReview(review.id);
      setCommentInfo(comments);
      const count = await getCommentCount(review.id);
      setCommentCount(count);
    };

    getComments();
  });

  const likeHandler = async () => {
    if (isLiked == true) {
      await addLike(review.id);
      const newReview = await getReviewById(review.id);
      console.log(newReview);
      setLike(newReview.likes);
      setIsLiked(false);
    } else if (isLiked == false) {
      await deleteLike(review.id);
      const newReview = await getReviewById(review.id);
      setLike(newReview.likes);
      setIsLiked(true);
    }
  };

  const commentHandler = async () => {
    setOpenComments(!openComments);
  };

  const handleClick = () => {
    setTouched(true);
  };

  const addCommentHandler = async () => {
    await addComment(comment, user.id, review.id);
    setComment("");
  };

  return (
    <div className="feed">
      <div className="posts-section">
        <div className="post">
          <div className="postWrapper">
            <div className="postTop">
              <div className="postTopLeft">
                <Link to={`/profile/${user.id}`}>
                  <img className="postProfileImg" src={profilePic} alt="" />
                  <span className="postUsername">
                    {user.firstName} {user.lastName}
                  </span>
                </Link>

                <span className="postUsername">reviewed</span>
                <span className="postUsername">{book.title}</span>
                {/* <span className="postDate">June 12th 2022</span> */}
              </div>
              <div className="postTopRight">
                <MoreVertIcon />
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
                <ColorButton>Want to Read</ColorButton>
              </div>
              <h5>Summary</h5>
              {description}
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
                      <div>
                        <img
                          className="postProfileImg"
                          src={profilePic}
                          alt=""
                        />
                        <span className="postUsername">
                          {comment.user.firstName} {comment.user.lastName}{" "}
                          commented
                        </span>
                      </div>
                      <div className="comment-text">
                        <span>{comment.comment}</span>
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
                <img className="postProfileImg" src={profilePic} alt="" />
                <StyledTextfield
                  className="comment-box"
                  label="Write a comment..."
                  inputProps={{
                    style: {
                      width: "670px",
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
