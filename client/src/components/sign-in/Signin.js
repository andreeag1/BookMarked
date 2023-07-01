import React from "react";
import "./Signin.css";
import { TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { loginUser } from "../../modules/user/userRepository";
import { useFormik } from "formik";
import { loginSchema } from "../../schemas";
import { useNavigate } from "react-router-dom";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#E9E7E5"),
  backgroundColor: "#DDDDDC",
  "&:hover": {
    backgroundColor: "#DDDDDD",
  },
}));

export default function Signin() {
  const [error, setError] = React.useState(false);
  const navigate = useNavigate();

  const onSubmit = async () => {
    const loggedIn = await loginUser(values.email, values.password);
    if (loggedIn === 200) {
      setError(false);
      navigate("/Dashboard");
    } else {
      setError(true);
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit,
    });

  return (
    <div className="signin-section">
      <div className="box">
        <AccountCircleIcon className="icon" sx={{ fontSize: "90px" }} />
        <h1>Login</h1>
        <div className={errors.email && touched.email ? "input-error" : ""}>
          <TextField
            value={values.email}
            id="email"
            placeholder="Email"
            sx={{ width: "350px" }}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {errors.email && touched.email ? (
          <p className="error-class">{errors.email}</p>
        ) : (
          <div />
        )}
        <div className={errors.email && touched.email ? "input-error" : ""}>
          <TextField
            value={values.password}
            id="password"
            placeholder="Password"
            type="password"
            sx={{ width: "350px" }}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {errors.password && touched.password ? (
          <p className="error-class">{errors.password}</p>
        ) : (
          <div />
        )}
        {error === true ? (
          <p className="invalid-error">Please enter valid credentials</p>
        ) : (
          <div />
        )}
        <ColorButton onClick={handleSubmit} component={Link} to="/Dashboard">
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
