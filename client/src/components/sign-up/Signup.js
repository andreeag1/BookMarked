import React, { useState, useEffect } from "react";
import "./Signup.css";
import { TextField, Button, FormControl } from "@mui/material";
import { styled } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, Navigate } from "react-router-dom";
import { registerUser } from "../../modules/user/userRepository.js";
import { useFormik } from "formik";
import { basicSchema } from "../../schemas";
import { CallToActionSharp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#E9E7E5"),
  backgroundColor: "#DDDDDC",
  "&:hover": {
    backgroundColor: "#DDDDDD",
  },
}));

export default function Signup() {
  const navigate = useNavigate();

  const onSubmit = () => {
    registerUser(
      values.firstName,
      values.lastName,
      values.email,
      values.username,
      values.password
    );
    navigate("/login");
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
      },
      validationSchema: basicSchema,
      onSubmit,
    });

  return (
    <div className="signup">
      <div className="box">
        <AccountCircleIcon className="icon" sx={{ fontSize: "90px" }} />
        <h1>Sign-up</h1>
        <h6>
          Become a BookMarked member and discover a new community of friends!
        </h6>

        <div
          className={errors.firstName && touched.firstName ? "input-error" : ""}
        >
          <TextField
            id="firstName"
            value={values.firstName}
            placeholder="Firstname"
            sx={{ width: "350px" }}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {errors.firstName && touched.firstName ? (
          <p className="error">{errors.firstName}</p>
        ) : (
          <div />
        )}

        <div
          className={errors.lastName && touched.lastName ? "input-error" : ""}
        >
          <TextField
            id="lastName"
            value={values.lastName}
            placeholder="Lastname"
            sx={{ width: "350px" }}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
        </div>
        {errors.lastName && touched.lastName ? (
          <p className="error">{errors.lastName}</p>
        ) : (
          <div />
        )}
        <div className={errors.email && touched.email ? "input-error" : ""}>
          <TextField
            id="email"
            value={values.email}
            placeholder="email"
            sx={{ width: "350px" }}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
        </div>
        {errors.email && touched.email ? (
          <p className="error-email">{errors.email}</p>
        ) : (
          <div />
        )}
        <div
          className={errors.username && touched.username ? "input-error" : ""}
        >
          <TextField
            id="username"
            value={values.username}
            placeholder="username"
            sx={{ width: "350px" }}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
        </div>
        {errors.username && touched.username ? (
          <p className="error">{errors.username}</p>
        ) : (
          <div />
        )}
        <div
          className={errors.password && touched.password ? "input-error" : ""}
        >
          <TextField
            id="password"
            value={values.password}
            type="password"
            placeholder="Password"
            sx={{ width: "350px" }}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
        </div>
        {errors.password && touched.password ? (
          <p className="error-password">{errors.password}</p>
        ) : (
          <div />
        )}
        <ColorButton onClick={handleSubmit} component={Link} to="/login">
          Sign-up
        </ColorButton>
      </div>
    </div>
  );
}
