import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./Book.css";
import data from "../../mock.json";
import { TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Feed from "../../components/feed/Feed";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getReviewByBook } from "../../modules/review/reviewRepository";
import { getBookByImg } from "../../modules/books/bookRepository";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#E9E7E5"),
  backgroundColor: "#f0ebe6",
  "&:hover": {
    backgroundColor: "#f0ebe6",
  },
}));

export default function Book() {
  const { bookId } = useParams();
  const location = useLocation();

  const [book, setBook] = React.useState([]);
  const [authorKey, setAuthorKey] = React.useState("");
  const [bookAuthor, setBookAuthor] = React.useState("");
  const [bookCover, setBookCover] = React.useState("");
  const [mediumCover, setMediumCover] = React.useState("");
  const [review, setReview] = React.useState([]);

  useEffect(() => {
    const handleBookList = async () => {
      await fetch(`https://openlibrary.org/works/${bookId}.json`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const newDescription = "No Description";
          if (!data.description) {
            const Obj = {
              title: data.title,
              description: newDescription,
            };
            setBook(Obj);
            setAuthorKey(data.authors[0].author.key);
            const cover = `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg`;
            setBookCover(cover);
          } else {
            if (data.description.value) {
              const Obj = {
                title: data.title,
                description: data.description.value,
              };
              setBook(Obj);
            } else {
              const Obj = {
                title: data.title,
                description: data.description,
              };
              setBook(Obj);
            }

            setAuthorKey(data.authors[0].author.key);
            const cover = `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg`;
            setBookCover(cover);
            const mediumBookCover = `https://covers.openlibrary.org/b/id/${data.covers[0]}-M.jpg`;
            const replacedCover = mediumBookCover.replaceAll("/", "_");
            console.log(replacedCover);
            setMediumCover(replacedCover);
          }
        });
    };
    handleBookList();
  }, [bookId]);

  useEffect(() => {
    const handleAuthor = async () => {
      await fetch(`https://openlibrary.org${authorKey}.json`)
        .then((response) => response.json())
        .then((data) => {
          const name = data.name;
          setBookAuthor(name);
        });
    };
    handleAuthor();
  }, [authorKey]);

  useEffect(() => {
    const getReviews = async () => {
      console.log(mediumCover);
      const existingBook = await getBookByImg(mediumCover);
      if (existingBook == null) {
        console.log("This book does not exist");
      }
      console.log(existingBook);
      const reviews = await getReviewByBook(existingBook.id);
      console.log(reviews);
      setReview(reviews);
    };
    getReviews();
  }, [mediumCover]);

  return (
    <div className="book-section-wrapper">
      <Header />
      <div className="book-section">
        <img src={bookCover} className="book-cover" />
        <div className="book-information">
          <h1>{book.title}</h1>
          <h3>{bookAuthor}</h3>
          <h7>{book.description}</h7>
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
        {review.map((singleReview) => (
          <Feed review={singleReview} description={book.description} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
