import React, { useRef, useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./Dashboard.css";
import CurrentlyReading from "../../components/currently-reading/currentlyReading";
import YearGoal from "../../components/year-goal/YearGoal";
import CollectionsWidget from "../../components/collections-widget/CollectionsWidget";
import Feed from "../../components/feed/Feed";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Bookshelf from "../../components/bookshelf/Bookshelf";
import ProfileList from "../../components/profile-list/Profile-list";
import { getFriendsReviews } from "../../modules/user/userRepository";
import { FlashOffOutlined } from "@mui/icons-material";

export default function Dashboard() {
  const [booksRead, setBooksRead] = React.useState(0);
  const [review, setReview] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [array, setArray] = React.useState([]);
  const [zeroReviews, setZeroReviews] = React.useState(false);

  useEffect(() => {
    newUser();
  }, [array]);

  const newUser = async () => {
    const newReview = await getFriendsReviews();
    if (newReview.length === 0) {
      setZeroReviews(true);
    }
    newReview.map((reviews) => {
      reviews.reviews.map((singleReview) => {
        const title = singleReview.book.title;
        const cover = singleReview.book.imageLink.replace(
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
                        user: reviews,
                        other: singleReview,
                        description: newDescription,
                      };
                      setReview((old) => [...old, Obj]);
                      setLoading(false);
                    } else {
                      if (data.description.value) {
                        const Obj = {
                          user: reviews,
                          other: singleReview,
                          description: data.description.value,
                        };
                        setReview((old) => [...old, Obj]);
                        setLoading(false);
                      } else {
                        const Obj = {
                          user: reviews,
                          other: singleReview,
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
    });
  };

  return (
    <div className="dashboard">
      <Header />
      <div className="main-section">
        <div className="overview">
          <Grid container spacing={9} rowSpacing={4}>
            <Grid item>
              <CurrentlyReading setBooksRead={setBooksRead} />
            </Grid>
            <Grid item>
              <div className="second-widget">
                <YearGoal booksRead={booksRead} />
              </div>
            </Grid>
            <Grid item>
              <CollectionsWidget />
            </Grid>
          </Grid>
        </div>
        <div className="content-section">
          <Grid container>
            <Grid item>
              <div className="bookshelf-container">
                <Bookshelf />
              </div>
            </Grid>
            <Grid item>
              <div className="updates-container">
                <h3>Updates</h3>
              </div>
              <div className="feed-container">
                {zeroReviews ? (
                  <div className="no-reviews">
                    <h7>Follow other users to see their updates!</h7>
                    <h7>Here are some like-minded book lovers to follow...</h7>
                    <ProfileList />
                  </div>
                ) : (
                  <div>
                    {loading ? (
                      <CircularProgress />
                    ) : (
                      review.map((singleReview) => (
                        <Feed
                          user={singleReview.user}
                          book={singleReview.other.book}
                          review={singleReview.other}
                          description={singleReview.description}
                        />
                      ))
                    )}
                  </div>
                )}
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
      <Footer />
    </div>
  );
}
