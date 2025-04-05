import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedLayout: React.FC = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
