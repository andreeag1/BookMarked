import "./Header.css";
import React, { useEffect } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { getCurrentUserId, logout } from "../../modules/user/userRepository";

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
  const [search, setSearch] = React.useState("");
  const [searchedBookInfo, setSearchedBookInfo] = React.useState([]);
  const [anchorElTwo, setAnchorElTwo] = React.useState(null);
  const [isLoggedIn, setIsLogedIn] = React.useState(false);

  const openTwo = Boolean(anchorElTwo);
  const handleOpen = (event) => {
    setAnchorElTwo(event.currentTarget);
  };
  const handleClickClose = () => {
    setAnchorElTwo(null);
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      navigate("/search", { state: search });
    }
  };

  const handleLogout = async () => {
    setAnchorElTwo(null);
    setAnchorEl(null);
    await logout();
    navigate("/");
  };

  useEffect(() => {
    const checkUser = async () => {
      const user = await getCurrentUserId();
      if (user) {
        setIsLogedIn(true);
      } else {
        setIsLogedIn(false);
      }
    };

    checkUser();
  });

  return isLoggedIn ? (
    <div className="header">
      <ThemeProvider theme={theme}>
        <AppBar position="fixed">
          <Container maxWidth="100%">
            <Toolbar disableGutters>
              <img src={logo} className="App-logo" alt="logo" />
              <Box className="title-container">
                <Link to={"/dashboard"}>
                  <span className="title" component="div">
                    BookMarked
                  </span>
                </Link>
              </Box>
              <Box sx={{ flexGrow: 1 }} />
              <div className="search-bar">
                <Search>
                  <StyledTextfield
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                      disableUnderline: true,
                    }}
                    placeholder="Search books"
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleSubmit}
                    sx={{
                      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                          border: alpha(theme.palette.common.white, 0.65),
                        },
                      height: 40,
                      width: 300,
                    }}
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
                  <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to="/dashboard"
                  >
                    Home
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to="/my-books"
                  >
                    My Books
                  </MenuItem>
                  <MenuItem onClick={handleClose} component={Link} to="/browse">
                    Browse
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to="/account"
                  >
                    My Account
                  </MenuItem>
                  <MenuItem component={Link} to="/login" onClick={handleLogout}>
                    Logout
                  </MenuItem>
                </Menu>
              </div>
              <div className="navbar-links">
                <div className="links">
                  <Button
                    key="Home"
                    sx={{ color: "inherit" }}
                    component={Link}
                    to="/dashboard"
                  >
                    Home
                  </Button>
                </div>
                <div className="links">
                  <Button
                    key="MyBooks"
                    sx={{ color: "inherit" }}
                    component={Link}
                    to={`/my-books`}
                  >
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
                  <AccountCircle
                    className="AccountCircleIcon"
                    onClick={handleOpen}
                  />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorElTwo}
                  open={openTwo}
                  onClose={handleClickClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem
                    onClick={handleClickClose}
                    component={Link}
                    to="/account"
                  >
                    My account
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    </div>
  ) : (
    <div className="header">
      <ThemeProvider theme={theme}>
        <AppBar position="fixed">
          <div className="new-header">
            <Container maxWidth="100%">
              <Toolbar disableGutters>
                <img src={logo} className="App-logo" alt="logo" />
                <Box className="title-container">
                  <Link to={"/"}>
                    <span className="title" component="div">
                      BookMarked
                    </span>
                  </Link>
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <div className="search-bar">
                  <Search>
                    <StyledTextfield
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                        disableUnderline: true,
                      }}
                      placeholder="Search books"
                      onChange={(e) => setSearch(e.target.value)}
                      onKeyDown={handleSubmit}
                      sx={{
                        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                          {
                            border: alpha(theme.palette.common.white, 0.65),
                          },
                        height: 40,
                        width: 300,
                      }}
                    />
                  </Search>
                </div>
                <Box sx={{ flexGrow: 1 }} className="box-container" />
              </Toolbar>
            </Container>
          </div>
        </AppBar>
      </ThemeProvider>
    </div>
  );
};

export default Header;
