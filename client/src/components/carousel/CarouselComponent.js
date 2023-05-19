import "./CarouselComponent.css";
import * as React from "react";
import data from "../../mock.json";
import BookCard from "../book-card/BookCard.js";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

export default function CarouselComponent() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 664 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 764, min: 0 },
      items: 2,
    },
  };
  return (
    <div className="carousel">
      <div className="first-carousel">
        <h3>Popular Releases</h3>
        <Carousel responsive={responsive}>
          {data.map((book) => (
            <BookCard book={book} />
          ))}
        </Carousel>
      </div>
      <div className="second-carousel">
        <h3>Fiction</h3>
        <Carousel responsive={responsive}>
          {data.map((book) => (
            <BookCard book={book} />
          ))}
        </Carousel>
      </div>
      <div className="third-carousel">
        <h3>Romance</h3>
        <Carousel responsive={responsive}>
          {data.map((book) => (
            <BookCard book={book} />
          ))}
        </Carousel>
      </div>
      <div className="fourth-carousel">
        <h3>Contemporary</h3>
        <Carousel responsive={responsive}>
          {data.map((book) => (
            <BookCard book={book} />
          ))}
        </Carousel>
      </div>
      <div className="fifth-carousel">
        <h3>Fantasy</h3>
        <Carousel responsive={responsive}>
          {data.map((book) => (
            <BookCard book={book} />
          ))}
        </Carousel>
      </div>
      <div className="sixth-carousel">
        <h3>Sci-Fi</h3>
        <Carousel responsive={responsive}>
          {data.map((book) => (
            <BookCard book={book} />
          ))}
        </Carousel>
      </div>
    </div>
  );
}
