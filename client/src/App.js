import "./App.css";
import React from "react";
import Header from "./components/header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Browse from "./pages/Browse/Browse.js";
import Home from "./pages/Home/Home.js";
import Login from "./pages/Login/Login.js";
import Register from "./pages/Register/Register.js";
import Dashboard from "./pages/Dashboard/Dashboard.js";
import Account from "./pages/Account/Account.js";
import Book from "./pages/Book/Book.js";
import MyBooks from "./pages/MyBooks/MyBooks";
import MyBooksMain from "./pages/MyBooks/MyBooksMain";
import Search from "./pages/Search/Search.js";
import CurrentUserAccount from "./pages/Account/CurrentUserAccount.js";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/browse"
          element={
            <PrivateRoute>
              <Browse />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route
          path="/Dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/account"
          element={
            <PrivateRoute>
              <CurrentUserAccount />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/:userId"
          element={
            <PrivateRoute>
              <Account />
            </PrivateRoute>
          }
        />
        <Route path="/book/:bookId" element={<Book />} />
        <Route
          path="/my-books/:collectionId"
          element={
            <PrivateRoute>
              <MyBooks />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-books"
          element={
            <PrivateRoute>
              <MyBooksMain />
            </PrivateRoute>
          }
        />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
