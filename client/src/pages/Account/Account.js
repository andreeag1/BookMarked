import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./Account.css";
import Feed from "../../components/feed/Feed";
import { Box } from "@mui/material";
import profilePic from "../../assets/pictures/1.jpeg";
import CardProfile from "../../components/card-profile/CardProfile";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";
import { getUserById, getFollowing } from "../../modules/user/userRepository";
import { getReviewByUser } from "../../modules/review/reviewRepository";

export default function Account() {
  const { userId } = useParams();
  const [firstName, setFirstName] = React.useState("");
  const [following, setFollowing] = React.useState([]);
  const [review, setReview] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const newUserId = userId;

  useEffect(() => {
    const newUser = async () => {
      console.log(userId);
      const user = await getUserById(userId);
      setFirstName(user.firstName);
      const friends = await getFollowing(userId);
      setFollowing(friends);
      const newReview = await getReviewByUser(userId);
      console.log(newReview);
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
                  await fetch(`https://openlibrary.org${bookId}.json`)
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
      }
    };
    newUser();
    console.log(review);
  }, [newUserId]);

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
                  <img className="postProfileImg" src={profilePic} alt="" />
                  <h7>
                    {friend.firstName} {friend.lastName}
                  </h7>
                </div>
              );
            })}
          </div>
          <h3 className="reviews">{firstName}'s Reviews</h3>
          <div className="feed-container">
            {loading ? (
              <CircularProgress />
            ) : (
              review.map((singleReview) => (
                <Feed
                  review={singleReview.other}
                  description={singleReview.description}
                />
              ))
            )}
          </div>
        </div>
        <div className="other">
          <h3 className="friends">{firstName}'s friends</h3>
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
