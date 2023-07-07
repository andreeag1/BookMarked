import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./Account.css";
import CurrentUserCardProfile from "../../components/card-profile/CurrentUserCardProfile";
import Feed from "../../components/feed/Feed";
import { Box } from "@mui/material";
import profilePic from "../../assets/pictures/1.jpeg";
import { getCurrentUserFollowing } from "../../modules/user/userRepository";

export default function CurrentUserAccount() {
  const [following, setFollowing] = React.useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const user = await getCurrentUserFollowing();
      setFollowing(user);
    };
    getFriends();
  });

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
          <div className="feed-container">{/* <Feed /> */}</div>
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
