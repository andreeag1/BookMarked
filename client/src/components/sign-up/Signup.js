import React from "react";
import "./Signup.css";
import { TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#E9E7E5"),
  backgroundColor: "#DDDDDC",
  "&:hover": {
    backgroundColor: "#DDDDDD",
  },
}));

export default function Signup() {
  return (
    <div className="signup">
      <div className="box">
        <AccountCircleIcon className="icon" sx={{ fontSize: "90px" }} />
        <h1>Sign-up</h1>
        <h6>
          Become a BookMarked member and discover a new community of friends!
        </h6>
        <TextField placeholder="Firstname" sx={{ width: "350px" }} />
        <TextField placeholder="Lastname" sx={{ width: "350px" }} />
        <TextField placeholder="Username/email" sx={{ width: "350px" }} />
        <TextField
          type="password"
          placeholder="Password"
          sx={{ width: "350px" }}
        />
        <ColorButton>Sign-up</ColorButton>
      </div>
    </div>
  );
}
