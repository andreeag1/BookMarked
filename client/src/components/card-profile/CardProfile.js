import React, { useEffect } from "react";
import "./CardProfile.css";
import Avatar from "@mui/material/Avatar";
import { Divider } from "@mui/material";
import {
  getUserById,
  followUser,
  unfollowUser,
  getFollowing,
  getCurrentUserId,
} from "../../modules/user/userRepository";
import { getCollectionTitles } from "../../modules/collection/collectionRepository";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { storage } from "../../firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";
import profilePic from "../../assets/pictures/profile.png";

const FollowButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#cab9a9"),
  backgroundColor: "#cab9a9",
  "&:hover": {
    backgroundColor: "#cab9a9",
  },
}));

const UnfollowButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#cab9a9"),
  backgroundColor: "#E1D5CA",
  "&:hover": {
    backgroundColor: "#E1D5CA",
  },
}));

export default function CardProfile({ userId }) {
  const [user, setUser] = React.useState("");
  const [collections, setCollections] = React.useState([]);
  const [followed, setFollowed] = React.useState(false);
  const [url, setUrl] = React.useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const newUser = async () => {
      const user = await getUserById(userId);
      const currentUserId = await getCurrentUserId();
      const following = await getFollowing(currentUserId);
      following.map((user) => {
        if (user.id == userId) {
          setFollowed(true);
        }
      });
      setUser({ firstName: user.firstName, lastName: user.lastName });
      const newCollections = await getCollectionTitles(userId);
      const titles = [];
      newCollections.map((collection) => {
        titles.push(collection);
      });
      setCollections(titles);
      const imageRef = ref(storage, userId);
      getDownloadURL(imageRef)
        .then((url) => {
          setUrl(url);
        })
        .catch((error) => {
          setUrl(profilePic);
        });
    };
    newUser();
  }, [userId]);

  const handleFollow = async () => {
    const authorized = await getCurrentUserId();
    if (authorized) {
      const follow = await followUser(userId);
      if (follow !== 404) {
        setFollowed(true);
      }
    } else {
      navigate("/login");
    }
  };

  const handleUnfollow = async () => {
    const authorized = await getCurrentUserId();
    if (authorized) {
      setFollowed(false);
      const unfollow = await unfollowUser(userId);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="card-profile">
      <div className="profile-img-set">
        <Avatar sx={{ width: 150, height: 150 }} src={url} />
        <div className="follow-button">
          {followed ? (
            <UnfollowButton onClick={handleUnfollow}>Unfollow</UnfollowButton>
          ) : (
            <FollowButton
              className="follower-button"
              sx={{ width: 100 }}
              onClick={handleFollow}
            >
              Follow
            </FollowButton>
          )}
        </div>
      </div>
      <div className="profile-info">
        <div className="name">
          <h4>{user.firstName}</h4>
          <div className="lastName">
            <h4>{user.lastName}</h4>
          </div>
        </div>
        <Divider sx={{ bgcolor: "black", width: "400px" }} />
        {/* <div className="favourite-books">
          <span style={{ fontWeight: "bold" }}>Favourite books:</span>
          <h6>Classics, fantasy, victorian lit</h6>
        </div> */}
        <div className="favourite-books">
          <span style={{ fontWeight: "bold" }}>Collections:</span>
          <div className="book-collections">
            <ul className="list">
              <a>
                {collections.map((collection) => (
                  <li className="list-items">{collection.title}</li>
                ))}
              </a>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
