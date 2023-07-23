import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { getCurrentUserId } from "./modules/user/userRepository";
import { useLocation } from "react-router-dom";

const PrivateRoute = (props) => {
  const { children } = props;
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);

  useEffect(() => {
    const userLogedIn = async () => {
      const user = await getCurrentUserId();
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };
    userLogedIn();
  });
  const location = useLocation();

  return isLoggedIn ? <>{children}</> : <Navigate replace to="/login" />;
};

export default PrivateRoute;
