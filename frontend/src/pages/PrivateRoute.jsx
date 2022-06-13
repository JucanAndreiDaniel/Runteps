import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";
import Loading from "../components/Loading";

export default function PrivateRoute({ children }) {
  const { user, isLoading } = useContext(UserContext);
  if (isLoading) {
    return <Loading />;
  }
  return user ? children : <Navigate to="/login" />;
}
