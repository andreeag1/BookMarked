import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import AboutSection from "../../components/about-section/AboutSection";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <Header />
      <AboutSection />
      <div className="footerr">
        <Footer />
      </div>
    </div>
  );
}
