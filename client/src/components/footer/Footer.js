import React from "react";
import "./Footer.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Footer() {
  return (
    <div className="footer">
      <div className="sb_footer section_padding">
        <div className="sb_footer-links">
          <div className="sb_footer-links-div">
            <h4>BookMarked</h4>
            <p>Designed and Built by Andreea Gugiuman</p>
          </div>
          <div className="sb_footer-links-div">
            <h4>Useful Links</h4>
            <a href="/employer">
              <p>Account</p>
            </a>
            <a href="/healthplan">
              <p>Settings</p>
            </a>
            <a href="/individual">
              <p>Notifications</p>
            </a>
          </div>
          <div className="sb_footer-links-div">
            <h4>Bookstore Links</h4>
            <a href="https://www.chapters.indigo.ca/en-ca/">
              <p>Indigo</p>
            </a>
            <a href="https://www.amazon.ca/">
              <p>Amazon</p>
            </a>
            <a href="https://bookoutlet.ca/">
              <p>Book Outlet</p>
            </a>
          </div>
          <div className="sb_footer-links-div">
            <h4>Socials</h4>
            <div className="socialmedia">
              <a href="/">
                <p>
                  <InstagramIcon />
                  Instagram
                </p>
              </a>
            </div>
            <div className="socialmedia">
              <a href="/">
                <p>
                  <FacebookIcon />
                  Facebook
                </p>
              </a>
            </div>
            <div className="socialmedia">
              <a href="/">
                <p>
                  <GitHubIcon />
                  Github
                </p>
              </a>
            </div>
          </div>
        </div>

        <hr></hr>

        <div className="sb_footer-below">
          <div className="sb_footer-copyright">
            <p>@{new Date().getFullYear()} BookMarked. All rights reserved.</p>
          </div>
          <div className="sb_footer-below-links">
            <a href="/">
              <div>
                <p>Terms & Conditions</p>
              </div>
            </a>
            <a href="/">
              <div>
                <p>Privacy</p>
              </div>
            </a>
            <a href="/">
              <div>
                <p>Security</p>
              </div>
            </a>
            <a href="/">
              <div>
                <p>Cookie Declaration</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
