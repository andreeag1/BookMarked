import * as React from "react";
import "./Feed.css";
import profilePic from "../../assets/pictures/1.jpeg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BookCard from "../book-card/BookCard";
import data from "../../mock.json";
import likeIcon from "../../assets/pictures/like.png";
import heartIcon from "../../assets/pictures/heart.png";
import { Button, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#E9E7E5"),
  backgroundColor: "#DDDDDC",
  "&:hover": {
    backgroundColor: "#DDDDDD",
  },
}));

export default function Feed() {
  const [like, setLike] = React.useState(0);
  const [isLiked, setIsLiked] = React.useState(false);

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className="feed">
      <div className="posts-section">
        {data.map((book) => (
          <div className="post">
            <div className="postWrapper">
              <div className="postTop">
                <div className="postTopLeft">
                  <img className="postProfileImg" src={profilePic} alt="" />
                  <span className="postUsername">John Doe</span>
                  <span className="postUsername">reviewed</span>
                  <span className="postUsername">Book title</span>
                  <span className="postDate">June 12th 2022</span>
                </div>
                <div className="postTopRight">
                  <MoreVertIcon />
                </div>
              </div>
            </div>
            <div className="postReview">
              <h7 className="postText">
                Hello Everyone! random text blah blah blah blah blah blah blah
                blah blah blah
              </h7>
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
                random text blah blah blah blah blah blah blah blah blah blah
                random text blah blah blah blah blah blah blah blah blah blah
                random text blah blah blah blah blah blah blah blah blah blah
                random text blah blah blah blah blah blah blah blah blah blah
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
                <span className="postLikeCounter">{like} people like it</span>
              </div>
              <div className="postBottomRight">
                <span className="postCommentText">3 comments</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
