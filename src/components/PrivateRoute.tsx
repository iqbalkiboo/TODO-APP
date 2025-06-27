import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MainLayout from "../layouts/MainLayout";

export default function PrivateRoute() {
  const { user } = useAuth();

  // Jika user belum login, redirect ke halaman login
  if (!user) return <Navigate to="/" replace />;

  // Jika sudah login, tampilkan halaman dengan layout
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
