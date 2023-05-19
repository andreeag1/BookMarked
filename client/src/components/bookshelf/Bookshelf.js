import * as React from "react";
import "./Bookshelf.css";
import data from "../../mock.json";
import bookshelf from "../../assets/pictures/bookshelf.png";

export default function Bookshelf() {
  return (
    <div className="books-section">
      <div className="discover">
        <h3>Discover new books</h3>
      </div>
      <img src={data[0].imageLink} className="first-book" />
      <img src={data[1].imageLink} className="second-book" />
      <img src={data[2].imageLink} className="third-book" />
      <img src={data[3].imageLink} className="fourth-book" />
      <img src={data[4].imageLink} className="fifth-book" />
      <img src={data[5].imageLink} className="sixth-book" />

      <img src={bookshelf} className="bookshelf" />

      <img src={data[0].imageLink} className="first-book" />
      <img src={data[1].imageLink} className="second-book" />
      <img src={data[2].imageLink} className="third-book" />
      <img src={data[3].imageLink} className="fourth-book" />
      <img src={data[4].imageLink} className="fifth-book" />
      <img src={data[5].imageLink} className="sixth-book" />
      <img src={bookshelf} className="second-bookshelf" />
    </div>
  );
}
