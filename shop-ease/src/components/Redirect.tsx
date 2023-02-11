import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Login } from "../pages/Login";

export function ProtectedRoutes() {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem("accessToken");
    setAccessToken(tokenFromLocalStorage);
  }, []);

  // return accessToken != null ? <Outlet /> : <Navigate to="/login" />;
  return accessToken == null ? <Outlet /> : <Navigate to="/login" />;
}
