import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./Account.css";
import Feed from "../../components/feed/Feed";
import { Box } from "@mui/material";
import profilePic from "../../assets/pictures/1.jpeg";
import CardProfile from "../../components/card-profile/CardProfile";
import { useParams } from "react-router-dom";
import { getUserById } from "../../modules/user/userRepository";

export default function Account() {
  const { userId } = useParams();
  const [firstName, setFirstName] = React.useState("");

  useEffect(() => {
    const newUser = async () => {
      console.log(userId);
      const user = await getUserById(userId);
      setFirstName(user.firstName);
    };
    newUser();
  }, [userId]);

  return (
    <div className="account">
      <Header />
      <div className="profile-wrapper">
        <div className="profile">
          <CardProfile userId={userId} />
          <Box sx={{ flexGrow: 1 }} />
          <div className="friends-list">
            <h3 className="friends">{firstName}'s friends</h3>
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
          <h3 className="reviews">{firstName}'s Reviews</h3>
          <div className="feed-container">{/* <Feed /> */}</div>
        </div>
        <div className="other">
          <h3 className="friends">{firstName}'s friends</h3>
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
