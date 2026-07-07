import { BrowserRouter, Routes, Route } from "react-router-dom";

import { PrivateRoute } from "./PrivateRoute";

import AppLayout from "./AppLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Feed from "../pages/Feed/Feed";
import MyArticles from "../pages/MyArticles/MyArticles";
import Profile from "../pages/Profile/Profile";
import Dashboard from "../pages/Dashboard/Dashboard";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route element={<AppLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Rotas privadas */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/my-articles" element={<MyArticles />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Página 404 */}
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  );
}
