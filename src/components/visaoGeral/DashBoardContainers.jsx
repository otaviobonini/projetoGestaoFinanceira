import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faArrowDown,
  faArrowUp,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useMemo } from "react";
import calcularEconomiaMensal from "../../utils/economiaMensal";
import calcularPorcentagemMes from "../../utils/porcentagemAoMes";
import Loading from "../Loading";
import { useMetas } from "../../hooks/useMetas";
import { useTransacoes } from "../../hooks/useTransacoes";
import { TransactionContext } from "../../store/transactionsContext";

export default function DashboardContainers() {
  const { transacoes, loading } = useTransacoes();
  const { mes } = useContext(TransactionContext);
  const { metas } = useMetas();

  const { economiaAtual } = calcularEconomiaMensal(transacoes, mes);

  const {
    totalMes: totalGanho,
    porcentagem: porcentagemGanho,
    saldo: saldoTotal,
  } = calcularPorcentagemMes(transacoes, "entrada", mes);

  const { totalMes: totalGasto, porcentagem: porcentagemGasto } =
    calcularPorcentagemMes(transacoes, "saida", mes);

  const metasGuardadas = useMemo(() => {
    return metas.reduce((acc, meta) => acc + Number(meta.valorGuardado), 0);
  }, [metas]);

  const saldo = saldoTotal - metasGuardadas;

  return (
    <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-3 mr-4">
      {loading ? (
        <Loading />
      ) : (
        <div className="h-48 rounded-2xl  border border-gray-300 bg-white p-8 shadow-lg">
          <FontAwesomeIcon icon={faWallet} className="text-blue-600 text-xl" />

          <h1 className=" text-lg font-semibold text-gray-600">Saldo atual</h1>

          <p className=" text-3xl font-bold text-gray-900">
            R${" "}
            {saldo.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}
          </p>

          <p className="mt-2 text-sm font-medium uppercase tracking-wide text-gray-500">
            Economia mensal
          </p>

          <p className="mt-1 text-lg font-bold text-green-600">
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
        <div className="h-48 rounded-2xl border border-gray-300 bg-white p-8 shadow-lg">
          <FontAwesomeIcon
            icon={faChartLine}
            className="text-blue-600 text-xl"
          />

          <h1 className=" text-lg font-semibold text-gray-600">
            Total ganho no mês
          </h1>

          <p className=" text-3xl font-bold text-gray-900">
            R${" "}
            {totalGanho.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}
          </p>

          <p className="mt-4 text-base font-semibold text-green-600">
            <FontAwesomeIcon icon={faArrowUp} className="mr-2" />
            {porcentagemGanho}% em relação ao mês passado
          </p>
        </div>
      )}

      {loading ? (
        <Loading />
      ) : (
        <div className="h-48 rounded-2xl border border-gray-300 bg-white p-8 shadow-lg">
          <FontAwesomeIcon
            icon={faChartLine}
            flip="horizontal"
            className="text-xl text-red-500"
          />

          <h1 className=" text-lg font-semibold text-gray-600">
            Total gasto no mês
          </h1>

          <p className=" text-3xl font-bold text-gray-900">
            R${" "}
            {totalGasto.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}
          </p>

          <p className="mt-3 text-base font-semibold text-red-600">
            <FontAwesomeIcon icon={faArrowDown} className="mr-2" />
            {porcentagemGasto}% em relação ao mês passado
          </p>
        </div>
      )}
    </div>
  );
}
