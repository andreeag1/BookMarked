import "./App.css";
import * as React from "react";
import Header from "./components/header/Header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";
import Browse from "./pages/Browse/Browse.js";
import Home from "./pages/Home/Home.js";
import Login from "./pages/Login/Login.js";
import Register from "./pages/Register/Register.js";
import Dashboard from "./pages/Dashboard/Dashboard.js";
import Account from "./pages/Account/Accout.js";
import Book from "./pages/Book/Book.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/account" element={<Account />} />
        <Route path="/book/:bookId" element={<Book />} />
      </Routes>
    </Router>
  );
}

export default App;
