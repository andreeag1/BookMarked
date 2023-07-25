import "./CarouselComponent.css";
import React, { useEffect } from "react";
import BookCard from "../book-card/BookCard.js";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

export default function CarouselComponent() {
  const [fantasy, setFantasy] = React.useState([]);
  const [sciFi, setSciFi] = React.useState([]);
  const [romance, setRomance] = React.useState([]);
  const [ya, setYa] = React.useState([]);
  const [trending, setTrending] = React.useState([]);
  const [history, setHistory] = React.useState([]);
  const [array, setArray] = React.useState([]);

  useEffect(() => {
    const getBooks = async () => {
      fetch("https://openlibrary.org/trending/now.json")
        .then((response) => response.json())
        .then((data) => {
          const book = data.works;
          const newBook = [];
          book.map((work) => {
            const newId = work.key.replace("/works/", "");
            const Obj = {
              id: newId,
              title: work.title,
              author: work.author_name,
              imageLink: `https://covers.openlibrary.org/b/id/${work.cover_i}-M.jpg`,
            };
            newBook.push(Obj);
          });
          setTrending(newBook);
        });
      fetch("https://openlibrary.org/subjects/fantasy.json")
        .then((response) => response.json())
        .then((data) => {
          const book = data.works;
          const newBook = [];
          book.map((work) => {
            const newId = work.key.replace("/works/", "");
            const Obj = {
              id: newId,
              title: work.title,
              author: work.authors[0].name,
              imageLink: `https://covers.openlibrary.org/b/id/${work.cover_id}-M.jpg`,
            };
            newBook.push(Obj);
          });
          setFantasy(newBook);
        });
      fetch("https://openlibrary.org/subjects/science_fiction.json")
        .then((response) => response.json())
        .then((data) => {
          const book = data.works;
          const newBook = [];
          book.map((work) => {
            const newId = work.key.replace("/works/", "");
            const Obj = {
              id: newId,
              title: work.title,
              author: work.authors[0].name,
              imageLink: `https://covers.openlibrary.org/b/id/${work.cover_id}-M.jpg`,
            };
            newBook.push(Obj);
          });
          setSciFi(newBook);
        });
      fetch(
        "https://openlibrary.org/subjects/romance.json?published_in=1900-2000"
      )
        .then((response) => response.json())
        .then((data) => {
          const book = data.works;
          const newBook = [];
          book.map((work) => {
            const newId = work.key.replace("/works/", "");
            const Obj = {
              id: newId,
              title: work.title,
              author: work.authors[0].name,
              imageLink: `https://covers.openlibrary.org/b/id/${work.cover_id}-M.jpg`,
            };
            newBook.push(Obj);
          });
          setRomance(newBook);
        });
      fetch("https://openlibrary.org/subjects/young_adult_fiction.json")
        .then((response) => response.json())
        .then((data) => {
          const book = data.works;
          const newBook = [];
          book.map((work) => {
            const newId = work.key.replace("/works/", "");
            const Obj = {
              id: newId,
              title: work.title,
              author: work.authors[0].name,
              imageLink: `https://covers.openlibrary.org/b/id/${work.cover_id}-M.jpg`,
            };
            newBook.push(Obj);
          });
          setYa(newBook);
        });
      fetch("https://openlibrary.org/subjects/history.json")
        .then((response) => response.json())
        .then((data) => {
          const book = data.works;
          const newBook = [];
          book.map((work) => {
            const newId = work.key.replace("/works/", "");
            const Obj = {
              id: newId,
              title: work.title,
              author: work.authors[0].name,
              imageLink: `https://covers.openlibrary.org/b/id/${work.cover_id}-M.jpg`,
            };
            newBook.push(Obj);
          });
          setHistory(newBook);
        });
    };
    getBooks();
  }, [array]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 664 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 764, min: 0 },
      items: 2,
    },
  };
  return (
    <div className="carousel">
      <div className="first-carousel">
        <h3>Trending Now</h3>
        <Carousel responsive={responsive}>
          {trending.map((book) => (
            <div className="book-card">
              <Link to={`/book/${book.id}`}>
                <BookCard book={book} />
              </Link>
            </div>
          ))}
        </Carousel>
      </div>
      <div className="second-carousel">
        <h3>Young-Adult</h3>
        <Carousel responsive={responsive}>
          {ya.map((book) => (
            <div className="book-card">
              <Link to={`/book/${book.id}`}>
                <BookCard book={book} />
              </Link>
            </div>
          ))}
        </Carousel>
      </div>
      <div className="third-carousel">
        <h3>Romance</h3>
        <Carousel responsive={responsive}>
          {romance.map((book) => (
            <div className="book-card">
              <Link to={`/book/${book.id}`}>
                <BookCard book={book} />
              </Link>
            </div>
          ))}
        </Carousel>
      </div>
      <div className="fourth-carousel">
        <h3>History</h3>
        <Carousel responsive={responsive}>
          {history.map((book) => (
            <div className="book-card">
              <Link to={`/book/${book.id}`}>
                <BookCard book={book} />
              </Link>
            </div>
          ))}
        </Carousel>
      </div>
      <div className="fifth-carousel">
        <h3>Fantasy</h3>
        <Carousel responsive={responsive}>
          {fantasy.map((book) => (
            <div className="book-card">
              <Link to={`/book/${book.id}`}>
                <BookCard book={book} />
              </Link>
            </div>
          ))}
        </Carousel>
      </div>
      <div className="sixth-carousel">
        <h3>Sci-Fi</h3>
        <Carousel responsive={responsive}>
          {sciFi.map((book) => (
            <div className="book-card">
              <Link to={`/book/${book.id}`}>
                <BookCard book={book} />
              </Link>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
