import { useAuth } from "@/hooks/useAuth";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    // If not authenticated, redirect to login
    return <Navigate to="/forbidden" />;
  }

  // If authenticated, allow access to the route
  return children;
};

export default AdminRoute;
