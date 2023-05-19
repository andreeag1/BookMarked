import React from "react";
import "./Signin.css";
import { TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#E9E7E5"),
  backgroundColor: "#DDDDDC",
  "&:hover": {
    backgroundColor: "#DDDDDD",
  },
}));

export default function Signin() {
  return (
    <div className="signin-section">
      <div className="box">
        <AccountCircleIcon className="icon" sx={{ fontSize: "90px" }} />
        <h1>Login</h1>
        <TextField placeholder="Username/email" sx={{ width: "350px" }} />
        <TextField placeholder="Password" sx={{ width: "350px" }} />
        <ColorButton component={Link} to="/Dashboard">
          Login
        </ColorButton>
        <div className="signup-section">
          <p>Don't have an account?</p>
          <div className="signup-link">
            <Button variant="text" component={Link} to="/sign-up">
              Sign-up!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
