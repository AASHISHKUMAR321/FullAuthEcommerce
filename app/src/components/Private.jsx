import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const Private = ({ children }) => {
  let user = JSON.parse(sessionStorage.getItem("user"));

  if (user == null) {
    alert("first you have to loged In ");

    return <Navigate to={"/login"} />;
  }
  return children;
};
