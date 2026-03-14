import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faArrowDown,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { TransactionContext } from "../../store/transctionsContext";

export default function DashboardContainers({
  proximaFatura,
  porcentagemGanho,
  porcentagemGasto,
  totalGanho,
  totalGasto,
}) {
  const { saldo } = useContext(TransactionContext);
  return (
    <div className="flex gap-8 mt-4 ">
      <div className=" bg-green-400 w-72 h-48 rounded-2xl p-8 shadow-lg">
        <h1 className="text-lg font-semibold">SALDO ATUAL</h1>
        <p className="text-3xl font-bold">R$ {saldo.toLocaleString("pt-BR")}</p>
        <p className="text-sm font-normal mt-5">FATURA PROXIMA</p>
        <p className="text-xl font-bold">R$ {proximaFatura.toFixed(2)}</p>
      </div>
      <div className=" h-48 rounded-2xl p-8 shadow-lg">
        <FontAwesomeIcon
          icon={faChartLine}
          style={{ color: "rgb(99, 230, 190)", fontSize: "24px" }}
        />
        <h1 className="text-lg font-semibold text-gray-500">
          Total ganho no mês
        </h1>
        <p className="text-3xl font-medium">
          R$ {totalGanho.toLocaleString("pt-BR")}
        </p>
        <p className="py-4 text-l font-semibold text-green-600">
          <FontAwesomeIcon icon={faArrowUp} />
          {porcentagemGanho} em relação ao mês passado
        </p>
      </div>
      <div className="  h-48 rounded-2xl p-8 shadow-lg">
        <FontAwesomeIcon
          icon={faChartLine}
          flip="horizontal"
          style={{ color: "rgb(255, 67, 67)", fontSize: "24px" }}
        />
        <h1 className="text-lg font-semibold  text-gray-500">
          Total gasto no mês
        </h1>
        <p className="text-3xl font-medium">
          R$ {totalGasto.toLocaleString("pt-BR")}
        </p>
        <p className="py-4 text-l font-semibold text-red-600">
          <FontAwesomeIcon icon={faArrowDown} /> {porcentagemGasto} em relação
          ao mês passado
        </p>
      </div>
    </div>
  );
}
