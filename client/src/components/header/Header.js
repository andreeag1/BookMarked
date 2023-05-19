import "./Header.css";
import * as React from "react";
import {
  Box,
  AppBar,
  Container,
  Toolbar,
  Typography,
  IconButton,
  Button,
  InputAdornment,
  Autocomplete,
  TextField,
  Menu,
  MenuItem,
} from "@mui/material";
import logo from "../../assets/pictures/vector.png";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled, alpha } from "@mui/material/styles";
import { Link } from "react-router-dom";
import data from "../../mock.json";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";

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

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.45),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.65),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledTextfield = styled(TextField)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="Header">
      <ThemeProvider theme={theme}>
        <AppBar position="fixed">
          <Container maxWidth="100%">
            <Toolbar disableGutters>
              <img src={logo} className="App-logo" alt="logo" />
              <Box className="title-container">
                <span className="title" component="div">
                  BookMarked
                </span>
              </Box>
              <Box sx={{ flexGrow: 1 }} />
              <div className="search-bar">
                <Search>
                  <Autocomplete
                    disablePortal
                    freeSolo
                    id="combo-box-demo"
                    sx={{
                      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                          border: alpha(theme.palette.common.white, 0.65),
                        },
                      maxWidth: 200,
                      maxHeight: 50,
                    }}
                    options={data}
                    getOptionLabel={(option) => option.title}
                    renderInput={(params) => (
                      <StyledTextfield
                        {...params}
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                          disableUnderline: true,
                        }}
                        sx={{ height: 50, width: 300 }}
                        placeholder="Search books"
                      />
                    )}
                  />
                </Search>
              </div>
              <Box sx={{ flexGrow: 1 }} className="box-container" />
              <div className="hamburger">
                <IconButton onClick={handleClick}>
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose}>Home</MenuItem>
                  <MenuItem onClick={handleClose}>My Books</MenuItem>
                  <MenuItem onClick={handleClose}>Browse</MenuItem>
                  <MenuItem onClick={handleClose}>My Account</MenuItem>
                </Menu>
              </div>
              <div className="navbar-links">
                <div className="links">
                  <Button
                    key="Home"
                    sx={{ color: "inherit" }}
                    component={Link}
                    to="/"
                  >
                    Home
                  </Button>
                </div>
                <div className="links">
                  <Button key="MyBooks" sx={{ color: "inherit" }}>
                    My Books
                  </Button>
                </div>
                <div className="links">
                  <Button
                    key="Browse"
                    sx={{ color: "inherit" }}
                    component={Link}
                    to="/browse"
                  >
                    Browse
                  </Button>
                </div>
              </div>
              <Box sx={{ flexGrow: 2 }} />
              <div className="icon-buttons">
                <IconButton>
                  <CircleNotificationsIcon className="CircleNotificationsIcon" />
                </IconButton>
                <IconButton component={Link} to="/account">
                  <AccountCircle className="AccountCircleIcon" />
                </IconButton>
              </div>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    </div>
  );
};

export default Header;
