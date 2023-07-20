import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./MyBooks.css";
import { useParams } from "react-router-dom";
import {
  getCollectionTitles,
  getCollectionById,
} from "../../modules/collection/collectionRepository";
import { Link } from "react-router-dom";
import { getCurrentUserId } from "../../modules/user/userRepository";
import { Grid } from "@mui/material";
import BookCard from "../../components/book-card/BookCard";

export default function MyBooksMain() {
  const [collections, setCollections] = React.useState([]);

  useEffect(() => {
    const getCollections = async () => {
      const userId = await getCurrentUserId();
      const collection = await getCollectionTitles(userId);
      setCollections(collection);
    };
    getCollections();
  });

  return (
    <div>
      <Header />
      <div className="my-books">
        <div className="title">
          <h1>My Books</h1>
          <div className="my-collection-section">
            <div className="title-section">
              <h4>Collections</h4>
              <div className="my-list">
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
                  {collections.map((collection) => {
                    return (
                      <li>
                        <Link to={`/my-books/${collection.id}`}>
                          {collection.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
