import React, { useEffect, useRef } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./Dashboard.css";
import CurrentlyReading from "../../components/currently-reading/currentlyReading";
import YearGoal from "../../components/year-goal/YearGoal";
import CollectionsWidget from "../../components/collections-widget/CollectionsWidget";
import Feed from "../../components/feed/Feed";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import BookCard from "../../components/book-card/BookCard";
import Bookshelf from "../../components/bookshelf/Bookshelf";
import { Divider } from "@mui/material";
import {
  getCurrentUserId,
  getFriendsReviews,
} from "../../modules/user/userRepository";

export default function Dashboard() {
  const [booksRead, setBooksRead] = React.useState(0);
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
    const newReview = await getFriendsReviews();
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

                      console.log(Obj);
                    } else {
                      if (data.description.value) {
                        const Obj = {
                          user: reviews,
                          other: singleReview,
                          description: data.description.value,
                        };
                        setReview((old) => [...old, Obj]);
                        setLoading(false);

                        console.log(Obj);
                      } else {
                        const Obj = {
                          user: reviews,
                          other: singleReview,
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
    });
  };

  return (
    <div className="dashboard">
      <Header />
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
          </Grid>
        </Grid>
      </div>
      <Footer />
    </div>
  );
}
