import React from "react";
// import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const AuthenticatedRoute = ({ Component }) => {
  // const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default AuthenticatedRoute;
