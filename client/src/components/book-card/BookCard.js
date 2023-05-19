import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const CardInfo = styled(CardContent)(({ theme }) => ({
  "&:last-child": {
    paddingBottom: theme.spacing(1),
  },
}));

const BookCard = ({ book, onClick }) => {
  return (
    <Card sx={{ maxWidth: 150, position: "relative" }} onClick={onClick}>
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="150"
          maxHeight="150"
          src={book.imageLink}
          alt={book.title}
        />
      </Box>

      <CardInfo>
        <Typography
          variant="h6"
          style={{ fontFamily: "Raleway", fontSize: 11 }}
          gutterBottom
          component="div"
        >
          {book.title}
        </Typography>
        <Typography
          variant="h8"
          style={{ fontFamily: "Raleway", fontSize: 10 }}
          gutterBottom
          component="div"
        >
          by {book.author}
        </Typography>
      </CardInfo>
    </Card>
  );
};

BookCard.propTypes = {
  book: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  }).isRequired,
};

export default BookCard;
