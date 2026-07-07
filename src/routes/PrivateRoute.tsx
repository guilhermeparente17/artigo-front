import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export function PrivateRoute() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex w-full">
      <Sidebar />
      <Outlet />
    </div>
  );
}
