import * as React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./Book.css";
import data from "../../mock.json";
import { TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Feed from "../../components/feed/Feed";
import { useParams } from "react-router-dom";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#E9E7E5"),
  backgroundColor: "#f0ebe6",
  "&:hover": {
    backgroundColor: "#f0ebe6",
  },
}));

export default function Book() {
  const { bookId } = useParams();

  return (
    <div className="book-section-wrapper">
      <Header />
      <div className="book-section">
        <img src={data[0].imageLink} className="book-cover" />
        <div className="book-information">
          <h1>{data[0].title}</h1>
          <h3>{data[0].author}</h3>
          <h7>
            Kentucky, 1850. An enslaved groom named Jarret and a bay foal forge
            a bond of understanding that will carry the horse to record-setting
            victories across the South. When the nation erupts in civil war, an
            itinerant young artist who has made his name on paintings of the
            racehorse takes up arms for the Union. On a perilous night, he
            reunites with the stallion and his groom, very far from the glamor
            of any racetrack. New York City, 1954. Martha Jackson, a gallery
            owner celebrated for taking risks on edgy contemporary painters,
            becomes obsessed with a nineteenth-century equestrian oil painting
            of mysterious provenance. Washington, DC, 2019. Jess, a Smithsonian
            scientist from Australia, and Theo, a Nigerian-American art
            historian, find themselves unexpectedly connected through their
            shared interest in the horse--one studying the stallion's bones for
            clues to his power and endurance, the other uncovering the lost
            history of the unsung Black horsemen who were critical to his racing
            success. Based on the remarkable true story of the record-breaking
            thoroughbred Lexington, Horse is a novel of art and science, love
            and obsession, and our unfinished reckoning with racism.
          </h7>
          <div className="categories">
            <span style={{ fontWeight: "bold" }}> Genres: </span>
            <h7>Fantasy</h7>
            <h7>Historical,</h7>
            <h7>Fiction,</h7>
          </div>
          <div className="btn-container">
            <ColorButton className="want-to-read-button">
              Want to Read
            </ColorButton>
          </div>
        </div>
      </div>
      <div className="review-section">
        <h2>Reviews</h2>
        <Feed />
      </div>
      <Footer />
    </div>
  );
}
