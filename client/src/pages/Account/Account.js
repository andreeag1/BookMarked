import React, { useEffect, useRef } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./Account.css";
import Feed from "../../components/feed/Feed";
import { Box } from "@mui/material";
import profilePic from "../../assets/pictures/profile.png";
import CardProfile from "../../components/card-profile/CardProfile";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useParams } from "react-router-dom";
import { getUserById, getFollowing } from "../../modules/user/userRepository";
import { getReviewByUser } from "../../modules/review/reviewRepository";
import { storage } from "../../firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function Account() {
  const { userId } = useParams();
  const [firstName, setFirstName] = React.useState("");
  const [following, setFollowing] = React.useState([]);
  const [review, setReview] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [array, setArray] = React.useState([]);
  const [zeroReviews, setZeroReviews] = React.useState(false);

  useEffect(() => {
    newUser();
  }, [array]);

  const newUser = async () => {
    const user = await getUserById(userId);
    setFirstName(user.firstName);
    const friends = await getFollowing(userId);
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
    const newReview = await getReviewByUser(userId);
    if (newReview.length == 0) {
      setZeroReviews(true);
    }
    if (newReview.length !== review.length) {
      newReview.map(async (reviews) => {
        const title = reviews.book.title;
        const cover = reviews.book.imageLink.replace(
          "https://covers.openlibrary.org/b/id/",
          ""
        );
        const newCover = cover.replace("-M.jpg", "");
        await fetch(
          "https://openlibrary.org/search.json?" +
            new URLSearchParams({
              q: title,
            })
        )
          .then((response) => response.json())
          .then((data) => {
            data.docs.map(async (book) => {
              if (book.cover_i == newCover) {
                const bookId = book.key;
                const newBookId = bookId.replace("/", "");
                await fetch(`https://openlibrary.org/${newBookId}.json`)
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
    }
  };

  return (
    <div className="account">
      <Header />
      <div className="profile-wrapper">
        <div className="profile">
          <CardProfile userId={userId} />
          <Box sx={{ flexGrow: 1 }} />
          <div className="friends-list">
            <h3 className="friends">{firstName}'s friends</h3>
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
          <h3 className="reviews">{firstName}'s Reviews</h3>
          <div className="feed-container">
            {zeroReviews ? (
              <div className="no-reviews">
                <h7>This user doesn't have any reviews yet!</h7>
              </div>
            ) : (
              <div>
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
            )}
          </div>
        </div>
        <div className="other">
          <h3 className="friends">{firstName}'s friends</h3>
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
