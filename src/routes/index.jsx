import { createBrowserRouter } from "react-router-dom";
import Sidebar from "../components/sidebar";
import DashboardPage from "../pages/DashboardPage";
import Transacoes from "../components/transacoes/transacoes";
import { Navigate } from "react-router-dom";
import Metas from "../components/metas/Metas";
import Categorias from "../components/categorias/Categorias";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import { action as logoutAction } from "../pages/Logout";
import { redirect } from "react-router-dom";

const requireAuth = () => {
  const token = localStorage.getItem("token");
  if (!token) return redirect("/login");
  return null;
};

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage></RegisterPage>,
  },
  {
    path: "/",
    element: <Sidebar />,
    errorElement: <NotFoundPage></NotFoundPage>,
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
        element: <Transacoes></Transacoes>,
      },
      {
        path: "metas",
        element: <Metas></Metas>,
      },
      {
        path: "categorias",
        element: <Categorias></Categorias>,
      },
      { path: "logout", action: logoutAction },
    ],
  },
]);
