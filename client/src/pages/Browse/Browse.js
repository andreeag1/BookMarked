import * as React from "react";
import Header from "../../components/header/Header";
import CarouselComponent from "../../components/carousel/CarouselComponent";
import Footer from "../../components/footer/Footer";
import "./Browse.css";

export default function Browse() {
  return (
    <div className="browse">
      <Header />
      <CarouselComponent />
      <Footer />
    </div>
  );
}
