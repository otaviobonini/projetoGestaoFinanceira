import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faArrowDown,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";

import calcularEconomiaMensal from "../../utils/economiaMensal";
import { TransactionContext } from "../../store/transctionsContext";
import calcularPorcentagemMes from "../../utils/porcentagemAoMes";
import Loading from "../Loading";

export default function DashboardContainers() {
  const { transacoes, metas, mes, loading } = useContext(TransactionContext);
  const { economiaAtual } = calcularEconomiaMensal(transacoes, mes);
  const {
    totalMes: totalGanho,
    porcentagem: porcentagemGanho,

    saldo: saldoTotal,
  } = calcularPorcentagemMes(transacoes, "entrada", mes);
  const { totalMes: totalGasto, porcentagem: porcentagemGasto } =
    calcularPorcentagemMes(transacoes, "saida", mes);

  const metasGuardadas = metas
    .map((meta) => meta.valorGuardado)
    .reduce((acc, value) => acc + value, 0);

  const saldo = saldoTotal - metasGuardadas;

  return (
    <div className="grid gap-8 mt-4 grid-cols-1 lg:grid-cols-3">
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-green-400 h-48 rounded-2xl p-8 shadow-lg">
          <h1 className="text-l font-semibold">SALDO ATUAL</h1>

          <p className="font-bold text-3xl">
            R$ {saldo.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </p>

          <p className="text-sm font-normal mt-5">ECONOMIA MENSAL</p>

          <p className="text-l font-bold">
            R${" "}
            {economiaAtual.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}
          </p>
        </div>
      )}

      {loading ? (
        <Loading />
      ) : (
        <div className="h-48 rounded-2xl p-8 shadow-lg">
          <FontAwesomeIcon
            icon={faChartLine}
            style={{ color: "rgb(99, 230, 190)", fontSize: "24px" }}
          />

          <h1 className="text-lg font-semibold text-gray-500">
            Total ganho no mês
          </h1>

          <p className="text-3xl font-medium">
            R${" "}
            {totalGanho.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}
          </p>

          <p className="py-4 text-l font-semibold text-green-600">
            <FontAwesomeIcon icon={faArrowUp} />
            {porcentagemGanho}% em relação ao mês passado
          </p>
        </div>
      )}

      {loading ? (
        <Loading></Loading>
      ) : (
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
            R${" "}
            {totalGasto.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </p>

          <p className="py-4 text-l font-semibold text-red-600">
            <FontAwesomeIcon icon={faArrowDown} /> {porcentagemGasto}% em
            relação ao mês passado
          </p>
        </div>
      )}
    </div>
  );
}
