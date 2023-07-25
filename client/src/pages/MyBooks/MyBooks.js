import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./MyBooks.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  getCollectionTitles,
  getCollectionById,
  deleteBookFromCollection,
} from "../../modules/collection/collectionRepository";
import { Link } from "react-router-dom";
import { getCurrentUserId } from "../../modules/user/userRepository";
import { Button, Grid } from "@mui/material";
import BookCard from "../../components/book-card/BookCard";
import { styled } from "@mui/material/styles";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#00000"),
  color: "#000000",
  backgroundColor: "#fffff",
  "&:hover": {
    backgroundColor: "#cab9a9",
  },
}));

export default function MyBooks() {
  const { collectionId } = useParams();
  const [collections, setCollections] = React.useState([]);
  const [books, setBooks] = React.useState([]);
  const [bookToDelete, setBookToDelete] = React.useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getCollections = async () => {
      const userId = await getCurrentUserId();
      const collection = await getCollectionTitles(userId);
      setCollections(collection);
      const book = await getCollectionById(collectionId);
      const titles = [];
      book.books.map((newBook) => {
        titles.push(newBook);
      });
      setBooks(titles);
    };
    getCollections();
  });

  useEffect(() => {
    const handleDeleteBook = async () => {
      const authorized = await getCurrentUserId();
      if (authorized) {
        if (bookToDelete !== "") {
          await deleteBookFromCollection(collectionId, bookToDelete);
        }
      } else {
        navigate("/login");
      }
    };

    handleDeleteBook();
  }, [bookToDelete]);

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
                  {collections.map((collection) => {
                    if (collection.id === collectionId) {
                      return (
                        <li>
                          <div className="collections-titles-section">
                            <Link to={`/my-books/${collection.id}`}>
                              <b>{collection.title}</b>
                            </Link>
                          </div>
                        </li>
                      );
                    } else {
                      return (
                        <li>
                          <Link to={`/my-books/${collection.id}`}>
                            {collection.title}
                          </Link>
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
            </div>
            <div className="collection-books-section">
              <Grid container spacing={2}>
                {books.map((book) => {
                  return (
                    <Grid item xs={9} md={5} lg={3}>
                      <div className="book-card-section">
                        <BookCard book={book} />
                        <ColorButton onClick={() => setBookToDelete(book.id)}>
                          Remove
                        </ColorButton>
                      </div>
                    </Grid>
                  );
                })}
              </Grid>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
