import logo from "../assets/logo.png";
import { NavLink, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form } from "react-router-dom";
import { Suspense } from "react";

import {
  faTableList,
  faTableCellsLarge,
  faCrosshairs,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Sidebar() {
  const [sidebarState, setSidebarState] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-black hover:text-black bg-green-200 rounded-lg p-2 w-1/2"
      : "hover:text-black p-2 w-1/2";

  return (
    <div className="flex min-h-screen ">
      {sidebarState && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setSidebarState(false)}
        />
      )}

      <aside
        className={`
    fixed top-0 left-0 h-full w-64 bg-white z-50
    flex flex-col justify-between shadow-md
    transform transition-transform duration-300
    ${sidebarState ? "translate-x-0" : "-translate-x-full"}
  `}
      >
        <div>
          <div className="flex items-center gap-2 p-4 ">
            <img
              className="w-32 h-24"
              src={logo}
              alt="Logo de Bonini Finances"
            />
            <h1 className="text-black text-xl font-normal">Bonini Finances</h1>
          </div>

          <div className="mt-4 ml-8">
            <h2 className="text-gray-400 font-bold">MENU PRINCIPAL</h2>

            <ul className="mt-4 space-y-4 text-gray-500 font-semibold">
              <li>
                <NavLink
                  to="dashboard"
                  onClick={() => setSidebarState(false)}
                  className={linkClass}
                >
                  <FontAwesomeIcon icon={faTableCellsLarge} />
                  Visão Geral
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="categorias"
                  onClick={() => setSidebarState(false)}
                  className={linkClass}
                >
                  <FontAwesomeIcon icon={faTableList} />
                  Categorias
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="metas"
                  onClick={() => setSidebarState(false)}
                  className={linkClass}
                >
                  <FontAwesomeIcon icon={faCrosshairs} />
                  Metas
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="transacoes"
                  onClick={() => setSidebarState(false)}
                  className={linkClass}
                >
                  <FontAwesomeIcon icon={faCreditCard} />
                  Transações
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="mb-12 flex">
          <Form action="/logout" method="post">
            <button
              className=" w-full 
     
      bg-gray-500 
      text-white 
      font-semibold 
      py-2 
      px-4
      text-center 
      rounded-lg 
      ml-8
      shadow-md 
      hover:bg-gray-600 
      "
            >
              Logout
            </button>
          </Form>
        </div>
      </aside>
      <main className="flex-1 bg-gray-100">
        <button
          onClick={() => setSidebarState(!sidebarState)}
          className="fixed top-4 left-4 z-30 bg-white px-3 py-2 rounded shadow"
        >
          ☰
        </button>
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-full text-gray-500">
              Carregando...
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
