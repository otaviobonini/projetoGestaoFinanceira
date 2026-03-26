import { createBrowserRouter, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { lazy } from "react";
import { requireAuth } from "../utils/auth";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import { action as logoutAction } from "../pages/Logout";

const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const Transacoes = lazy(() => import("../components/transacoes/Transacoes"));
const Metas = lazy(() => import("../components/metas/Metas"));
const Categorias = lazy(() => import("../components/categorias/Categorias"));

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: <Sidebar />,
    errorElement: <NotFoundPage />,
    loader: requireAuth,

    children: [
      {
        index: true,
        element: <Navigate to="dashboard" />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "transacoes",
        element: <Transacoes />,
      },
      {
        path: "metas",
        element: <Metas />,
      },
      {
        path: "categorias",
        element: <Categorias />,
      },
      { path: "logout", action: logoutAction },
    ],
  },
]);
