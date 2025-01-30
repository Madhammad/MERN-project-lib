import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const UserProjectedRoute = () => {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser ? <Outlet /> : <Navigate to="/signIn" />;
};
