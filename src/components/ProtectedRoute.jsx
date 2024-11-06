import React from "react";
import Cookies from "js-cookie";
import {Navigate, useLocation} from "react-router-dom";
import {useUser} from "../contexts/UserContext.jsx";

const ProtectedRoute = ({children, allowedRoles}) => {
  const {isAuthenticated, role} = useUser();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{from: location}} replace/>;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace/>;
  }

  return children;
};

export default ProtectedRoute;
