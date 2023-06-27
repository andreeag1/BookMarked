import * as React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./MyBooks.css";

export default function MyBooks() {
  return (
    <div>
      <Header />
      <div className="my-books">
        <div className="title">
          <h1>My Books</h1>
          <h4>Collections</h4>
          <div className="list">
            <ul>
              <li>
                <a href="/">All</a>
              </li>
              <li>
                <a href="/">Read</a>
              </li>
              <li>
                <a href="/">Want to read</a>
              </li>
              <li>
                <a href="/">Did not finish</a>
              </li>
              <li>
                <a href="/">Fantasy</a>
              </li>
              <li>
                <a href="/">contemporary</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
