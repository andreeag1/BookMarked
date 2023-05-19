import * as React from "react";
import "./YearGoal.css";
import { TextField, Button, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import book from "../../assets/animations/book.gif";
import bookStack from "../../assets/animations/bookStack.webp";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#E9E7E5"),
  backgroundColor: "#f0ebe6",
  "&:hover": {
    backgroundColor: "#f0ebe6",
  },
}));

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#f0ebe6",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#cab9a9",
  },
}));

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <StyledLinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function YearGoal({ booksRead }) {
  const [myBool, setmyBool] = React.useState(true);
  const [goal, setGoal] = React.useState(0);
  const [progress, setProgress] = React.useState(0);

  function toggleBool() {
    setmyBool(!myBool);
  }

  return myBool ? (
    <div className="container-year-goal">
      <div className="year-goal">
        <h5>Your {new Date().getFullYear()} Reading Challenge!</h5>
        <div className="goal-number">
          <h6>I want to read</h6>
          <TextField
            id="outlined-basic"
            variant="filled"
            type="number"
            sx={{ width: "60px" }}
            onChange={(e) => setGoal(e.target.value)}
          />
          <h6>books in {new Date().getFullYear()}</h6>
        </div>
        <div className="start-button">
          <ColorButton onClick={toggleBool}>Start Challenge!</ColorButton>
        </div>
        <LinearProgressWithLabel variant="determinate" value={progress} />
      </div>
    </div>
  ) : (
    <div className="container-year-goal">
      <div className="year-goal">
        <div className="progress-container">
          <h5>Your {new Date().getFullYear()} Reading Challenge!</h5>
          <div className="books-read">
            <h6>
              You have read {booksRead} books out of {goal}
            </h6>
          </div>
          <LinearProgressWithLabel
            variant="determinate"
            value={(booksRead / goal) * 100}
          />
        </div>
        <img src={book} alt="" className="book-gif" />
        <img src={bookStack} alt="" className="book-stack-gif" />
      </div>
    </div>
  );
}
