import React, { useEffect, useRef } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./Account.css";
import CurrentUserCardProfile from "../../components/card-profile/CurrentUserCardProfile";
import Feed from "../../components/feed/Feed";
import { Box } from "@mui/material";
import profilePic from "../../assets/pictures/1.jpeg";
import CircularProgress from "@mui/material/CircularProgress";
import {
  getCurrentUser,
  getCurrentUserFollowing,
  getCurrentUserId,
} from "../../modules/user/userRepository";
import { getReviewByUser } from "../../modules/review/reviewRepository";

export default function CurrentUserAccount() {
  const [following, setFollowing] = React.useState([]);
  const [review, setReview] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [array, setArray] = React.useState([]);

  const useDidMountEffect = () => {
    const didMount = useRef(false);
    React.useEffect(() => {
      if (didMount.current) {
        newUser();
      } else {
        didMount.current = true;
      }
    }, [array]);
  };

  useDidMountEffect(() => {
    console.log("second render");
  });

  const newUser = async () => {
    console.log("hello");
    const userId = await getCurrentUserId();
    const friends = await getCurrentUserFollowing();
    setFollowing(friends);
    const newReview = await getReviewByUser(userId);
    newReview.map((reviews) => {
      const title = reviews.book.title;
      const cover = reviews.book.imageLink.replace(
        "https://covers.openlibrary.org/b/id/",
        ""
      );
      const newCover = cover.replace("-M.jpg", "");
      fetch(
        "https://openlibrary.org/search.json?" +
          new URLSearchParams({
            q: title,
          })
      )
        .then((response) => response.json())
        .then((data) => {
          data.docs.map((book) => {
            if (book.cover_i == newCover) {
              const bookId = book.key;
              fetch(`https://openlibrary.org${bookId}.json`)
                .then((response) => response.json())
                .then((data) => {
                  const newDescription = "No Description";
                  if (!data.description) {
                    const Obj = {
                      other: reviews,
                      description: newDescription,
                    };
                    setReview((old) => [...old, Obj]);
                    setLoading(false);

                    console.log(Obj);
                  } else {
                    if (data.description.value) {
                      const Obj = {
                        other: reviews,
                        description: data.description.value,
                      };
                      setReview((old) => [...old, Obj]);
                      setLoading(false);

                      console.log(Obj);
                    } else {
                      const Obj = {
                        other: reviews,
                        description: data.description,
                      };
                      setReview((old) => [...old, Obj]);
                      setLoading(false);

                      console.log(Obj);
                    }
                  }
                });
            }
          });
        });
    });
  };

  return (
    <div className="account">
      <Header />
      <div className="profile-wrapper">
        <div className="profile">
          <CurrentUserCardProfile />
          <Box sx={{ flexGrow: 1 }} />
          <div className="friends-list">
            <h3 className="friends">Your friends</h3>
            {following.map((friend) => {
              return (
                <div className="friend">
                  <img className="postProfileImg" src={profilePic} alt="" />
                  <h7>
                    {friend.firstName} {friend.lastName}
                  </h7>
                </div>
              );
            })}
          </div>
          <h3 className="reviews">Your Reviews</h3>
          <div className="feed-container">
            {loading ? (
              <CircularProgress />
            ) : (
              review.map((singleReview) => (
                <Feed
                  user={singleReview.other.user}
                  book={singleReview.other.book}
                  review={singleReview.other}
                  description={singleReview.description}
                />
              ))
            )}
          </div>
        </div>
        <div className="other">
          <h3 className="friends">Your friends</h3>
          {following.map((friend) => {
            return (
              <div className="friend">
                <img className="postProfileImg" src={profilePic} alt="" />
                <h7>
                  {friend.firstName} {friend.lastName}
                </h7>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
