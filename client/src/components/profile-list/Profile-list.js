import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../modules/user/userRepository";
import { storage } from "../../firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import profilePic from "../../assets/pictures/profile.png";
import { Link } from "react-router-dom";
import "./Profile-list.css";

export default function ProfileList() {
  const [following, setFollowing] = React.useState([]);
  const [array, setArray] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [url, setUrl] = React.useState("");

  useEffect(() => {
    const handleNoReviews = async () => {
      const newUsers = await getAllUsers();
      const totalUsers = [];
      newUsers.map((user) => {
        if (totalUsers.length <= 15) {
          totalUsers.push(user);
        }
      });
      setFollowing(totalUsers);
    };

    handleNoReviews();
  }, [array]);

  return (
    <div className="profile-section">
      {following.map((newUser) => {
        return (
          <div className="user-profile-section">
            <Link to={`/profile/${newUser.id}`}>
              <img className="postProfileImg" src={profilePic} alt="" />
              <span>
                {newUser.firstName} {newUser.lastName}
              </span>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
