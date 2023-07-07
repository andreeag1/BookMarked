import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./Search.css";
import { useLocation } from "react-router-dom";
import BookCard from "../../components/book-card/BookCard";
import { Link } from "react-router-dom";
import { Box, Grid } from "@mui/material";

export default function Search({ search }) {
  const [searchedBookInfo, setSearchedBookInfo] = React.useState([]);
  const location = useLocation();

  useEffect(() => {
    const handleSubmit = async () => {
      fetch(
        "https://openlibrary.org/search.json?" +
          new URLSearchParams({
            q: location.state,
          })
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const books = data.docs.map((book) => {
            if (book.author_name && book.title && book.key && book.cover_i) {
              const newId = book.key.replace("/works/", "");
              const Obj = {
                id: newId,
                title: book.title,
                author: book.author_name[0],
                imageLink: `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`,
              };
              console.log(Obj);
              return Obj;
            }
          });
          const filteredArray = books.filter(function (element) {
            return element !== undefined;
          });
          console.log(filteredArray);
          setSearchedBookInfo(filteredArray);
        });
    };

    handleSubmit();
  }, [location]);

  return (
    <div>
      <Header />
      <div className="search-class">
        <h2>You searched for {location.state}: </h2>
        <div classNam="searched">
          <Grid container spacing={2}>
            {searchedBookInfo.map((book) => {
              return (
                <Grid item xs={3}>
                  <Link to={`/book/${book.id}`}>
                    <BookCard book={book} />
                  </Link>
                </Grid>
              );
            })}
          </Grid>
        </div>
      </div>
      <Footer />
    </div>
  );
}
