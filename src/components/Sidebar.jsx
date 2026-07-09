import logo from "../assets/logo.png";
import { NavLink, Outlet, Form } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Suspense, useState } from "react";

import {
  faTableList,
  faTableCellsLarge,
  faCrosshairs,
  faCreditCard,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
  const [sidebarState, setSidebarState] = useState(false);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 w-full rounded-xl px-4 py-3 transition font-semibold
    ${
      isActive
        ? "bg-green-200 text-black"
        : "text-gray-500 hover:bg-gray-100 hover:text-black"
    }`;

  return (
    <div className="flex min-h-screen">
      {sidebarState && (
        <div
          className="fixed inset-0 z-40 bg-black/30"
          onClick={() => setSidebarState(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-80 bg-white z-50
          flex flex-col justify-between shadow-lg
          transform transition-transform duration-300
          ${sidebarState ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div>
          <div className="flex items-center gap-3 px-6 py-5 border-b">
            <img
              className="w-20 h-20 object-contain"
              src={logo}
              alt="Logo de Bonini Finances"
            />
            <h1 className="text-xl font-semibold text-black">
              Bonini Finances
            </h1>
          </div>

          <div className="mt-8 px-6">
            <h2 className="text-sm font-bold tracking-wide text-gray-400">
              MENU PRINCIPAL
            </h2>

            <ul className="mt-5 flex flex-col gap-3">
              <li>
                <NavLink
                  to="dashboard"
                  onClick={() => setSidebarState(false)}
                  className={linkClass}
                >
                  <FontAwesomeIcon icon={faTableCellsLarge} />
                  <span>Visão Geral</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="categorias"
                  onClick={() => setSidebarState(false)}
                  className={linkClass}
                >
                  <FontAwesomeIcon icon={faTableList} />
                  <span>Categorias</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="metas"
                  onClick={() => setSidebarState(false)}
                  className={linkClass}
                >
                  <FontAwesomeIcon icon={faCrosshairs} />
                  <span>Metas</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="transacoes"
                  onClick={() => setSidebarState(false)}
                  className={linkClass}
                >
                  <FontAwesomeIcon icon={faCreditCard} />
                  <span>Transações</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="px-6 pb-8">
          <Form action="/logout" method="post">
            <button className="flex w-full items-center justify-center gap-3 rounded-xl bg-red-500 py-4 text-lg font-semibold text-white transition hover:bg-red-600">
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
              Logout
            </button>
          </Form>
        </div>
      </aside>

      <main className="flex-1 bg-gray-100">
        <button
          onClick={() => setSidebarState(!sidebarState)}
          className="fixed top-4 left-4 z-30 rounded-lg bg-white px-4 py-2 text-xl shadow-md hover:bg-gray-100"
        >
          ☰
        </button>

        <Suspense
          fallback={
            <div className="flex h-full items-center justify-center text-gray-500">
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
