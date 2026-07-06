import { BrowserRouter, Routes, Route } from "react-router-dom";

import { PrivateRoute } from "./PrivateRoute";

import AppLayout from "./AppLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Feed from "../pages/Feed/Feed";

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
          <Route path="/dashboard" element={<div>dashboard</div>} />
          <Route path="/feed" element={<Feed />} />
        </Route>

        {/* Página 404 */}
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  );
}
