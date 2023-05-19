import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Signup from "../../components/sign-up/Signup";

export default function Register() {
  return (
    <div>
      <Header />
      <Signup />
      <Footer />
    </div>
  );
}
