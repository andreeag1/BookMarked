import * as React from "react";
import "./CardProfile.css";
import Avatar from "@mui/material/Avatar";
import { Divider } from "@mui/material";

export default function CardProfile() {
  return (
    <div className="card-profile">
      <div className="profile-img">
        <Avatar sx={{ width: 150, height: 150 }} />
        <input type="file" />
      </div>
      <div className="profile-info">
        <h4>Andreea Gugiuman</h4>
        <Divider sx={{ bgcolor: "black", width: "400px" }} />
        <div className="favourite-books">
          <span style={{ fontWeight: "bold" }}>Favourite books:</span>
          <h6>Classics, fantasy, victorian lit</h6>
        </div>
        <div className="favourite-books">
          <span style={{ fontWeight: "bold" }}>Collections:</span>
          <div className="book-collections">
            <ul className="list">
              <a href={"/"}>
                <li className="list-item">Classics</li>
                <li className="list-item">Contemporary</li>
                <li className="list-item">Romance</li>
                <li className="list-item">Classics</li>
                <li className="list-item">Contemporary</li>
                <li className="list-item">Romance</li>
              </a>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
