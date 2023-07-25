import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./Book.css";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Feed from "../../components/feed/Feed";
import { useNavigate, useParams } from "react-router-dom";
import { getReviewByBook } from "../../modules/review/reviewRepository";
import {
  addBookToCollection,
  getCollection,
  getCollectionById,
  deleteBookFromCollection,
} from "../../modules/collection/collectionRepository";
import { getCurrentUserId } from "../../modules/user/userRepository";
import { createBook, getBookByImg } from "../../modules/books/bookRepository";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#E9E7E5"),
  backgroundColor: "#f0ebe6",
  "&:hover": {
    backgroundColor: "#f0ebe6",
  },
}));

const TouchedColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#E9E7E5"),
  backgroundColor: "#706a6a",
  "&:hover": {
    backgroundColor: "#706a6a",
  },
}));

export default function Book() {
  const { bookId } = useParams();
  const [book, setBook] = React.useState([]);
  const [authorKey, setAuthorKey] = React.useState("");
  const [bookAuthor, setBookAuthor] = React.useState("");
  const [bookCover, setBookCover] = React.useState("");
  const [mediumCover, setMediumCover] = React.useState("");
  const [review, setReview] = React.useState([]);
  const [zeroReviews, setZeroReviews] = React.useState(false);
  const [touched, setTouched] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isBookInCollection = async () => {
      const userId = await getCurrentUserId();
      const collection = await getCollection(userId, "Want To Read");
      const books = await getCollectionById(collection.id);
      books.books.map((newBook) => {
        const cover = mediumCover.replaceAll("_", "/");
        if (newBook.imageLink == cover) {
          setTouched(true);
        }
      });
    };
    isBookInCollection();
  });

  useEffect(() => {
    const handleBookList = async () => {
      await fetch(`https://openlibrary.org/works/${bookId}.json`)
        .then((response) => response.json())
        .then((data) => {
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
            const mediumBookCover = `https://covers.openlibrary.org/b/id/${data.covers[0]}-M.jpg`;
            const replacedCover = mediumBookCover.replaceAll("/", "_");
            setMediumCover(replacedCover);
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
      const existingBook = await getBookByImg(mediumCover);
      if (existingBook !== null) {
        const reviews = await getReviewByBook(existingBook.id);
        if (reviews.length == 0) {
          setZeroReviews(true);
        }
        setReview(reviews);
      } else {
        setZeroReviews(true);
      }
    };
    getReviews();
  }, [mediumCover]);

  const handleClick = async () => {
    const userId = await getCurrentUserId();
    if (userId) {
      const collection = await getCollection(userId, "Want To Read");
      const cover = mediumCover.replaceAll("_", "/");
      const newBook = await createBook(book.title, bookAuthor, cover);
      if (touched == false) {
        if (newBook == null) {
          const findBook = await getBookByImg(mediumCover);
          await addBookToCollection(collection.id, findBook.id);
          setTouched(true);
        } else {
          await addBookToCollection(collection.id, newBook.id);
          setTouched(true);
        }
      } else {
        if (newBook == null) {
          const findBook = await getBookByImg(mediumCover);
          await deleteBookFromCollection(collection.id, findBook.id);
          setTouched(false);
        } else {
          await deleteBookFromCollection(collection.id, newBook.id);
          setTouched(false);
        }
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="book-section-wrapper">
      <Header />
      <div className="book-section">
        <img src={bookCover} className="book-cover" />
        <div className="book-information">
          <h1>{book.title}</h1>
          <h3>{bookAuthor}</h3>
          <h7>{book.description}</h7>
          <div className="btn-container">
            {touched ? (
              <ColorButton
                className="want-to-read-button"
                onClick={handleClick}
              >
                Want to Read
              </ColorButton>
            ) : (
              <TouchedColorButton
                className="want-to-read-button"
                onClick={handleClick}
              >
                Want to Read
              </TouchedColorButton>
            )}
          </div>
        </div>
      </div>
      <div className="review-section">
        <h2>Reviews</h2>
        {zeroReviews ? (
          <p>No Reviews Yet!</p>
        ) : (
          review.map((singleReview) => (
            <Feed
              review={singleReview}
              user={singleReview.user}
              book={singleReview.book}
              description={book.description}
            />
          ))
        )}
      </div>
      <Footer />
    </div>
  );
}
