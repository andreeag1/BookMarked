import React, { useEffect } from "react";
import "./Feed.css";
import profilePic from "../../assets/pictures/1.jpeg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BookCard from "../book-card/BookCard";
import data from "../../mock.json";
import likeIcon from "../../assets/pictures/like.png";
import heartIcon from "../../assets/pictures/heart.png";
import { Button, Divider, Rating } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import {
  getCurrentUserId,
  getUserById,
  getCurrentUser,
} from "../../modules/user/userRepository";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#E9E7E5"),
  backgroundColor: "#DDDDDC",
  "&:hover": {
    backgroundColor: "#DDDDDD",
  },
}));

export default function Feed({ review, description }) {
  const [like, setLike] = React.useState(0);
  const [isLiked, setIsLiked] = React.useState(false);
  const [user, setUser] = React.useState("");

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    const getInfo = async () => {
      console.log(review);
    };
    getInfo();
  }, [review]);

  return (
    <div className="feed">
      <div className="posts-section">
        <div className="post">
          <div className="postWrapper">
            <div className="postTop">
              <div className="postTopLeft">
                <Link to={`/profile/${review.user.id}`}>
                  <img className="postProfileImg" src={profilePic} alt="" />
                </Link>
                <span className="postUsername">
                  {review.user.firstName} {review.user.lastName}
                </span>

                <span className="postUsername">reviewed</span>
                <span className="postUsername">{review.book.title}</span>
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
              <BookCard book={review.book} />
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
              <img
                className="likeIcon"
                src={heartIcon}
                onClick={likeHandler}
                alt=""
              />
              <span className="postLikeCounter">
                {review.likes} people like it
              </span>
            </div>
            <div className="postBottomRight">
              <span className="postCommentText">3 comments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
