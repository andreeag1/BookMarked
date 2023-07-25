import React, { useEffect } from "react";
import "./Bookshelf.css";
import bookshelf from "../../assets/pictures/bookshelf.png";
import { Link } from "react-router-dom";

export default function Bookshelf() {
  const [array, setArray] = React.useState([]);
  const [trending, setTrending] = React.useState([]);
  const [id, setId] = React.useState([]);

  useEffect(() => {
    const getBooks = async () => {
      fetch("https://openlibrary.org/trending/daily.json")
        .then((response) => response.json())
        .then((data) => {
          const book = data.works;
          const newBook = [];
          const newId = [];
          book.map((work) => {
            const bookId = work.key.replace("/works/", "");
            const Obj = `https://covers.openlibrary.org/b/id/${work.cover_i}-M.jpg`;
            newBook.push(Obj);
            newId.push(bookId);
          });
          setTrending(newBook);
          setId(newId);
        });
    };
    getBooks();
  }, [array]);

  return (
    <div className="books-section">
      <div className="discover">
        <h3>Discover new books</h3>
      </div>
      <Link to={`/book/${id[0]}`}>
        <img src={trending[0]} className="first-book" />
      </Link>
      <Link to={`/book/${id[1]}`}>
        <img src={trending[1]} className="second-book" />
      </Link>
      <Link to={`/book/${id[2]}`}>
        <img src={trending[2]} className="third-book" />
      </Link>
      <Link to={`/book/${id[3]}`}>
        <img src={trending[3]} className="fourth-book" />
      </Link>
      <Link to={`/book/${id[4]}`}>
        <img src={trending[4]} className="fifth-book" />
      </Link>
      <Link to={`/book/${id[5]}`}>
        <img src={trending[5]} className="sixth-book" />
      </Link>

      <img src={bookshelf} className="bookshelf" />

      <Link to={`/book/${id[6]}`}>
        <img src={trending[6]} className="first-book" />
      </Link>
      <Link to={`/book/${id[7]}`}>
        <img src={trending[7]} className="second-book" />
      </Link>
      <Link to={`/book/${id[8]}`}>
        <img src={trending[8]} className="third-book" />
      </Link>
      <Link to={`/book/${id[9]}`}>
        <img src={trending[9]} className="fourth-book" />
      </Link>
      <Link to={`/book/${id[10]}`}>
        <img src={trending[10]} className="fifth-book" />
      </Link>
      <Link to={`/book/${id[11]}`}>
        <img src={trending[11]} className="sixth-book" />
      </Link>
      <img src={bookshelf} className="second-bookshelf" />
    </div>
  );
}
