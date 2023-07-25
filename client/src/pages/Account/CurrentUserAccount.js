import React, { useEffect, useRef } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./Account.css";
import CurrentUserCardProfile from "../../components/card-profile/CurrentUserCardProfile";
import Feed from "../../components/feed/Feed";
import { Box } from "@mui/material";
import profilePic from "../../assets/pictures/profile.png";
import CircularProgress from "@mui/material/CircularProgress";
import {
  getCurrentUser,
  getCurrentUserFollowing,
  getCurrentUserId,
} from "../../modules/user/userRepository";
import { getReviewByUser } from "../../modules/review/reviewRepository";
import { storage } from "../../firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Link } from "react-router-dom";

export default function CurrentUserAccount() {
  const [following, setFollowing] = React.useState([]);
  const [review, setReview] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [array, setArray] = React.useState([]);
  const [zeroReviews, setZeroReviews] = React.useState(false);
  const [zeroFriends, setZeroFriends] = React.useState(false);

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

  useDidMountEffect(() => {});

  const newUser = async () => {
    const userId = await getCurrentUserId();
    const friends = await getCurrentUserFollowing();
    const totalFollowing = [];
    friends.map((user) => {
      const imageRef = ref(storage, user.id);
      getDownloadURL(imageRef)
        .then((url) => {
          const Obj = {
            following: user,
            url: url,
          };
          totalFollowing.push(Obj);
        })
        .catch((error) => {
          const Obj = {
            following: user,
            url: profilePic,
          };
          totalFollowing.push(Obj);
        });
    });
    setFollowing(totalFollowing);
    if (totalFollowing.length == 0) {
      setZeroFriends(true);
    }
    const newReview = await getReviewByUser(userId);
    if (newReview.length == 0) {
      setZeroReviews(true);
    }
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
                  } else {
                    if (data.description.value) {
                      const Obj = {
                        other: reviews,
                        description: data.description.value,
                      };
                      setReview((old) => [...old, Obj]);
                      setLoading(false);
                    } else {
                      const Obj = {
                        other: reviews,
                        description: data.description,
                      };
                      setReview((old) => [...old, Obj]);
                      setLoading(false);
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
            {zeroFriends ? (
              <h7>You don't follow anyone yet!</h7>
            ) : (
              following.map((friend) => {
                return (
                  <div className="friend">
                    <Link to={`/profile/${friend.following.id}`}>
                      <img className="postProfileImg" src={friend.url} alt="" />
                      <h7 className="friend-text">
                        {friend.following.firstName} {friend.following.lastName}
                      </h7>
                    </Link>
                  </div>
                );
              })
            )}
          </div>
          <h3 className="reviews">Your Reviews</h3>
          <div className="feed-container">
            {zeroReviews ? (
              <div className="no-reviews">
                <h7>You'll see your reviews here once you write one!</h7>
              </div>
            ) : loading ? (
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
                <Link to={`/profile/${friend.following.id}`}>
                  <img className="postProfileImg" src={friend.url} alt="" />
                  <h7 className="friend-text">
                    {friend.following.firstName} {friend.following.lastName}
                  </h7>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
