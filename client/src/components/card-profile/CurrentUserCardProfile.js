import React, { useEffect } from "react";
import "./CardProfile.css";
import Avatar from "@mui/material/Avatar";
import { Divider } from "@mui/material";
import {
  getCurrentUserId,
  getUserById,
  getCurrentUser,
  addProfilePic,
} from "../../modules/user/userRepository";
import { getCollectionTitles } from "../../modules/collection/collectionRepository";

export default function CurrentUserCardProfile() {
  const [user, setUser] = React.useState("");
  const [collections, setCollections] = React.useState([]);
  const [image, setImage] = React.useState("");

  useEffect(() => {
    const currentUser = async () => {
      const userId = await getCurrentUserId();
      const user = await getCurrentUser();
      setUser({ firstName: user.firstName, lastName: user.lastName });
      const newCollections = await getCollectionTitles(userId);
      const titles = [];
        newCollections.map((collection) => {
          titles.push(collection.title);
        });
      
      setCollections(titles);
    };
    currentUser();
  });

  // useEffect(() => {
  //   const ProfilePicture = async () => {
  //     addProfilePic(image);
  //   };
  //   ProfilePicture();
  // }, [image]);

  const handleApi = async () => {
    await addProfilePic(image);
  };

  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="card-profile">
      <div className="profile-img">
        <Avatar sx={{ width: 150, height: 150 }} />
        <input type="file" onChange={handleChange} />
        <button onClick={handleApi}>Submit</button>
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
