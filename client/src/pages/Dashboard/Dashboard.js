import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./Dashboard.css";
import CurrentlyReading from "../../components/currently-reading/currentlyReading";
import YearGoal from "../../components/year-goal/YearGoal";
import CollectionsWidget from "../../components/collections-widget/CollectionsWidget";
import Feed from "../../components/feed/Feed";
import Grid from "@mui/material/Grid";
import BookCard from "../../components/book-card/BookCard";
import Bookshelf from "../../components/bookshelf/Bookshelf";
import { Divider } from "@mui/material";
import { getCurrentUserId } from "../../modules/user/userRepository";

export default function Dashboard() {
  const [booksRead, setBooksRead] = React.useState(0);

  const getUser = async () => {
    const token = await getCurrentUserId();
    console.log(token);
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
              <Feed />
            </div>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </div>
  );
}
