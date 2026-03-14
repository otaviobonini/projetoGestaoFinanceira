import logo from "../assets/logo.png";
import { useContext } from "react";
import { TransactionContext } from "../store/transctionsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTableList,
  faTableCellsLarge,
  faCrosshairs,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
  const { activeButton, handleButtonClick } = useContext(TransactionContext);
  return (
    <div className="flex h-screen w-1/10">
      <aside>
        <div className="flex items-center gap-2 p-4 ">
          <img className="w-32 h-24" src={logo} alt="Logo de Bonini Finances" />
          <h1 className="text-black text-xl font-normal">Bonini Finances</h1>
        </div>

        <div className="mt-4 ml-8">
          <h2 className="text-gray-400 font-bold">MENU PRINCIPAL</h2>
          <ul className="mt-4 space-y-4 text-gray-500 font-semibold">
            <li>
              <button
                id="Visão Geral"
                onClick={() => handleButtonClick("Visão Geral")}
                className={
                  activeButton === "Visão Geral"
                    ? "text-black hover:text-black bg-green-200 rounded-lg p-2 w-1/2"
                    : "hover:text-black p-2 w-1/2"
                }
              >
                <FontAwesomeIcon icon={faTableCellsLarge} />
                Visão Geral
              </button>
            </li>
            <li>
              <button
                id="Categorias"
                onClick={() => handleButtonClick("Categorias")}
                className={
                  activeButton === "Categorias"
                    ? "text-black hover:text-black p-2  bg-green-200 rounded-lg w-1/2"
                    : "hover:text-black p-2 w-1/2"
                }
              >
                <FontAwesomeIcon icon={faTableList} />
                Categorias
              </button>
            </li>
            <li>
              <button
                id="Metas"
                onClick={() => handleButtonClick("Metas")}
                className={
                  activeButton === "Metas"
                    ? "text-black hover:text-black p-2  bg-green-200 rounded-lg w-1/2"
                    : "hover:text-black p-2 w-1/2"
                }
              >
                <FontAwesomeIcon icon={faCrosshairs} />
                Metas
              </button>
            </li>
            <li>
              <button
                id="Transacoes"
                onClick={() => handleButtonClick("Transacoes")}
                className={
                  activeButton === "Transacoes"
                    ? "text-black hover:text-black p-2  bg-green-200 rounded-lg w-1/2"
                    : "hover:text-black p-2 w-1/2"
                }
              >
                <FontAwesomeIcon icon={faCreditCard} />
                Transações
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
