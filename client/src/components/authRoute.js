import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./auth";

const AuthRoute = () => {
  const { user } = useContext(AuthContext);
  return user.user ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthRoute;
