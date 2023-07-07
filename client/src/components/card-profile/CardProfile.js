import React, { useEffect } from "react";
import "./CardProfile.css";
import Avatar from "@mui/material/Avatar";
import { Divider } from "@mui/material";
import {
  getUserById,
  followUser,
  unfollowUser,
} from "../../modules/user/userRepository";
import { getCollectionTitles } from "../../modules/collection/collectionRepository";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

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

  useEffect(() => {
    const newUser = async () => {
      console.log(userId);
      const user = await getUserById(userId);
      setUser({ firstName: user.firstName, lastName: user.lastName });
      const newCollections = await getCollectionTitles(userId);
      const titles = [];
      newCollections.map((collection) => {
        titles.push(collection.title);
      });
      setCollections(titles);
    };
    newUser();
  }, [userId]);

  const handleFollow = async () => {
    const follow = await followUser(userId);
    if (follow !== 404) {
      setFollowed(true);
    }
    console.log(follow);
  };

  const handleUnfollow = async () => {
    setFollowed(false);
    const unfollow = await unfollowUser(userId);
    console.log(unfollow);
  };

  return (
    <div className="card-profile">
      <div className="profile-img-set">
        <Avatar sx={{ width: 150, height: 150 }} />
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
              <a href={"/"}>
                {collections.map((collection) => (
                  <li className="list-items">{collection}</li>
                ))}
              </a>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
