import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { selectAuthUser } from "@/redux/selectors/auth-selectors";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = useSelector(selectAuthUser);

  if (!user) return <Navigate to="/auth" />;

  return children;
};

export default ProtectedRoute;
