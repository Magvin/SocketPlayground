import { Navigate } from "react-router-dom";
import { useAppContext } from "../context";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { store } = useAppContext();

  if (!store.user.name) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
