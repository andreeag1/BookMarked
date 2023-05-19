import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Signin from "../../components/sign-in/Signin";

export default function Login() {
  return (
    <div>
      <Header />
      <Signin />
      <Footer />
    </div>
  );
}
