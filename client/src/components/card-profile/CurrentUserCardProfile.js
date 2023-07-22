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
import { storage } from "../../firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Link } from "react-router-dom";
import profilePic from "../../assets/pictures/profile.png";

export default function CurrentUserCardProfile() {
  const [user, setUser] = React.useState("");
  const [collections, setCollections] = React.useState([]);
  const [image, setImage] = React.useState(null);
  const [url, setUrl] = React.useState(null);
  const [array, setArray] = React.useState([]);

  useEffect(() => {
    const currentUser = async () => {
      const userId = await getCurrentUserId();
      const user = await getCurrentUser();
      setUser({ firstName: user.firstName, lastName: user.lastName });
      const newCollections = await getCollectionTitles(userId);
      const titles = [];
      newCollections.map((collection) => {
        titles.push(collection);
      });

      setCollections(newCollections);
      const imageRef = ref(storage, userId);
      getDownloadURL(imageRef)
        .then((url) => {
          setUrl(url);
        })
        .catch((error) => {
          setUrl(profilePic);
        });
    };
    currentUser();
  }, [array]);

  const handleSubmit = async () => {
    const userId = await getCurrentUserId();
    const imageRef = ref(storage, userId);
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
          })
          .catch((error) => {
            console.log(error.message, "error getting the image URL");
          });
        setImage(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      console.log(image);
    }
  };

  return (
    <div className="card-profile">
      <div className="profile-img">
        <Avatar sx={{ width: 150, height: 150 }} src={url} />
        <input type="file" onChange={handleChange} />
        <button onClick={handleSubmit}>Submit</button>
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
                  <Link to={`/my-books/${collection.id}`}>
                    <li className="list-items">{collection.title}</li>
                  </Link>
                ))}
              </a>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
