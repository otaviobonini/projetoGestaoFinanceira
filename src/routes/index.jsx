import { createBrowserRouter, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { lazy } from "react";
import { requireAuth } from "../utils/auth";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import { action as logoutAction } from "../pages/Logout";

const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const TransacoesPage = lazy(() => import("../pages/TransacoesPage"));
const MetasPage = lazy(() => import("../pages/MetasPage"));
const CategoriasPage = lazy(() => import("../pages/CategoriasPage"));

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
        element: <TransacoesPage />,
      },
      {
        path: "metas",
        element: <MetasPage />,
      },
      {
        path: "categorias",
        element: <CategoriasPage />,
      },
      { path: "logout", action: logoutAction },
    ],
  },
]);
