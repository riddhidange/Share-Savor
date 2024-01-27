import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user);
  const { pathname } = useLocation();

  return user?.isAuthenticated ? (
    pathname === "/login" || pathname === "/register" || pathname === "/" ? (
      <Navigate to="/dashboard" />
    ) : (
      <>{children}</>
    )
  ) : pathname === "/login" || pathname === "/register" || pathname === "/" ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default ProtectedRoute;
