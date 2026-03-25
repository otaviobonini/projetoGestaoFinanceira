import DashboardContainers from "../components/visaoGeral/DashBoardContainers";
import NovaTransacao from "../components/visaoGeral/NovaTransacao";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import DateFilter from "../components/visaoGeral/DateFilter";
import { variaveisGrafico } from "../data/grafico";
import calcularPorcentagemMes from "../utils/porcentagemAoMes";
import { useContext } from "react";
import { TransactionContext } from "../store/transctionsContext";
ChartJS.register(ArcElement, Tooltip, Legend);
import UltimasTransacoes from "../components/visaoGeral/UltimasTransacoes";
import Skeleton from "../components/Skeleton";
export default function DashboardPage() {
  const { transacoes, mes, loading } = useContext(TransactionContext);
  const { colors, data, labels, porcentagens } = variaveisGrafico(
    transacoes,
    mes,
  );
  const { totalMes: totalGasto } = calcularPorcentagemMes(
    transacoes,
    "saida",
    mes,
  );
  return (
    <>
      {" "}
      <div className="bg-gray-100 w-full flex-1  h-full py-16 px-4">
        {" "}
        <h1 className="text-2xl font-bold">Dashboard</h1>{" "}
        <p className="text-gray-700 text-lg">
          {" "}
          Bem vindo de volta, aqui está o resumo das suas finanças.{" "}
        </p>{" "}
        <div className="flex justify-end ">
          {" "}
          <div className="gap-4 p-4 flex">
            <DateFilter></DateFilter>
            <NovaTransacao />{" "}
          </div>
        </div>{" "}
        <DashboardContainers />{" "}
        <div className="mt-12 bg-white rounded-2xl shadow-md w-2/3 p-8 ">
          {" "}
          <h1 className="text-xl font-bold">Grafico por categoria</h1>{" "}
          <p className="text-gray-700 font-semibold">
            {" "}
            Total gasto no mês:{" "}
            {loading ? (
              <Skeleton className="w-12 align-middle   sm:inline-block "></Skeleton>
            ) : (
              <label>
                R${" "}
                {totalGasto.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </label>
            )}{" "}
          </p>{" "}
          <div className="w-full h-72 mx-auto">
            <Doughnut
              data={data}
              options={{
                cutout: "80%",
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
              }}
            />
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {labels.map((label, i) => (
              <div key={label} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: colors[i % colors.length] }}
                  ></span>
                  <div className="space-x-4">
                    <span className="text-gray-500">{label}</span>
                    <span className="font-semibold">{porcentagens[i]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>{" "}
        <UltimasTransacoes />{" "}
      </div>{" "}
    </>
  );
}
