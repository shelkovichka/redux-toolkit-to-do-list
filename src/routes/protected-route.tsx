import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { selectUser } from "@/redux/selectors/auth-selectors";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = useSelector(selectUser);

  if (!user) return <Navigate to="/auth" />;

  return children;
};

export default ProtectedRoute;
