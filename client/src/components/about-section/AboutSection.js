import React from "react";
import HistoryIcon from "@mui/icons-material/History";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import "./AboutSection.css";
import {
  Card,
  TextField,
  Button,
  Grid,
  CardContent,
  Typography,
} from "@mui/material";
import books from "../../assets/pictures/books.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#E9E7E5",
      darker: "#053e85",
    },
  },
  typography: {
    fontFamily: ["Raleway"],
  },
});

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#E9E7E5"),
  backgroundColor: "#DDDDDC",
  "&:hover": {
    backgroundColor: "#DDDDDD",
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  color: theme.palette.getContrastText("#E9E7E5"),
  backgroundColor: "#DDDDDC",
  "&:hover": {
    backgroundColor: "#C3B7AD",
  },
}));

export default function AboutSection() {
  const navigate = useNavigate();
  const handleChange = () => navigate("/login");
  return (
    <div className="about">
      <div className="hero">
        <div className="hero-title">
          <div className="container">
            <h1>BookMarked</h1>
            <p>Read, review, repeat: Your go-to source for all things books</p>
            <div className="container-button">
              <ColorButton
                variant="contained"
                className="button"
                component={Link}
                to="/login"
              >
                Get Started
              </ColorButton>
            </div>
          </div>
        </div>
      </div>
      <div className="container-cards">
        <Grid container spacing={10}>
          <Grid item>
            <div className="cards-section">
              <StyledCard
                elevation={6}
                sx={{
                  height: 300,
                  width: 300,
                  maxWidth: 350,
                  backgroundColor: "#D7C7B8",
                  borderRadius: "9%",
                }}
              >
                <CardContent>
                  <div className="container-icon">
                    <HistoryIcon className="Icon" sx={{ fontSize: "60px" }} />
                  </div>
                  <h1 className="block-titles">PROGRESSION</h1>
                  <ThemeProvider theme={theme}>
                    <Typography className="block-descriptions">
                      Track your progress on your current reads and set monthly
                      and yearly goals to increase your reading habits
                    </Typography>
                  </ThemeProvider>
                </CardContent>
              </StyledCard>
            </div>
          </Grid>
          <Grid item>
            <div className="cards-section">
              <StyledCard
                elevation={6}
                sx={{
                  height: 300,
                  width: 300,
                  maxWidth: 350,
                  backgroundColor: "#D7C7B8",
                  borderRadius: "9%",
                }}
              >
                <CardContent>
                  <div className="container-icon">
                    <CollectionsBookmarkIcon
                      className="Icon"
                      sx={{ fontSize: "60px" }}
                    />
                  </div>
                  <h1 className="block-titles">COLLECTIONS</h1>
                  <ThemeProvider theme={theme}>
                    <Typography className="block-descriptions">
                      Create collections for your books and save titles that
                      peak your interest
                    </Typography>
                  </ThemeProvider>
                </CardContent>
              </StyledCard>
            </div>
          </Grid>
          <Grid item>
            <div className="cards-section">
              <StyledCard
                elevation={6}
                sx={{
                  height: 300,
                  width: 300,
                  maxWidth: 350,
                  backgroundColor: "#D7C7B8",
                  borderRadius: "9%",
                }}
              >
                <CardContent>
                  <div className="container-icon">
                    <Diversity3Icon
                      className="Icon"
                      sx={{ fontSize: "60px" }}
                    />
                  </div>
                  <h1 className="block-titles">COMMUNITY</h1>
                  <ThemeProvider theme={theme}>
                    <Typography className="block-descriptions">
                      Connect with other passionate likeminded readers, join
                      book clubs and discover thousands of titles
                    </Typography>
                  </ThemeProvider>
                </CardContent>
              </StyledCard>
            </div>
          </Grid>
        </Grid>
      </div>
      <div className="container-about">
        <div className="container-description">
          <img src={books} className="popular-books" />
          <div className="container-text">
            <h1>Trying to read more books?</h1>
            <h2>
              Then start your reading challenge today and enter the number of
              books you want to read this year!
            </h2>
            <div className="goal">
              <h2>I want to read</h2>
              <TextField
                id="outlined-basic"
                variant="filled"
                type="number"
                sx={{ width: "100px" }}
                onChange={handleChange}
              />
              <h2>books in {new Date().getFullYear()}</h2>
            </div>
            <h2>
              Whether you're a casual reader or a serious bookworm, our reading
              platform has everything you need to fuel your love of reading.
              Join us today and start exploring the wonderful world of books!
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
