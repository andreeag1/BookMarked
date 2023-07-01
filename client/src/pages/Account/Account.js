import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./Account.css";
import CardProfile from "../../components/card-profile/CardProfile";
import Feed from "../../components/feed/Feed";
import { Box } from "@mui/material";
import profilePic from "../../assets/pictures/1.jpeg";

export default function Account() {
  return (
    <div className="account">
      <Header />
      <div className="profile-wrapper">
        <div className="profile">
          <CardProfile />
          <Box sx={{ flexGrow: 1 }} />
          <div className="friends-list">
            <h3 className="friends">Your friends</h3>
            <div className="friend">
              <img className="postProfileImg" src={profilePic} alt="" />
              <h7>Jane Doe</h7>
            </div>
            <div className="friend">
              <img className="postProfileImg" src={profilePic} alt="" />
              <h7>Jane Doe</h7>
            </div>
            <div className="friend">
              <img className="postProfileImg" src={profilePic} alt="" />
              <h7>Jane Doe</h7>
            </div>
          </div>
          <h3 className="reviews">Andreea's Reviews</h3>
          <div className="feed-container">
            <Feed />
          </div>
        </div>
        <div className="other">
          <h3 className="friends">Your friends</h3>
          <div className="friend">
            <img className="postProfileImg" src={profilePic} alt="" />
            <h7>Jane Doe</h7>
          </div>
          <div className="friend">
            <img className="postProfileImg" src={profilePic} alt="" />
            <h7>Jane Doe</h7>
          </div>
          <div className="friend">
            <img className="postProfileImg" src={profilePic} alt="" />
            <h7>Jane Doe</h7>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
