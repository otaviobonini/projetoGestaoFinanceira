import DashboardContainers from "./DashBoardContainers";
import NovaTransacao from "./NovaTransacao";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { variaveisGrafico } from "../../data/grafico";
import { useContext } from "react";
import { TransactionContext } from "../../store/transctionsContext";
ChartJS.register(ArcElement, Tooltip, Legend);
import UltimasTransacoes from "./UltimasTransacoes";
export default function Dashboard() {
  const { transacoes } = useContext(TransactionContext);
  const ganho = transacoes
    .filter((t) => t.tipo === "entrada")
    .reduce((acc, t) => acc + t.valor, 0);
  const gasto = transacoes
    .filter((t) => t.tipo === "saida")
    .reduce((acc, t) => acc + t.valor, 0);
  const { colors, data, labels, porcentagens, totalGastos } =
    variaveisGrafico(transacoes);
  return (
    <>
      {" "}
      <div className="flex-1 ml-24 h-max py-16 bg-gray-100 px-8">
        {" "}
        <h1 className="text-2xl font-bold">Dashboard</h1>{" "}
        <p className="text-gray-700 text-lg">
          {" "}
          Bem vindo de volta, aqui está o resumo das suas finanças.{" "}
        </p>{" "}
        <div className="flex justify-end ">
          {" "}
          <NovaTransacao />{" "}
        </div>{" "}
        <DashboardContainers
          totalGanho={ganho}
          totalGasto={gasto}
          proximaFatura={300}
          porcentagemGanho={"+12%"}
          porcentagemGasto={"-5%"}
        />{" "}
        <div className="mt-12 bg-white rounded-2xl shadow-md p-8 max-w-5xl">
          {" "}
          <h1 className="text-xl font-bold">Grafico por categoria</h1>{" "}
          <p className="text-gray-700 font-semibold">
            {" "}
            Total gasto: R${totalGastos.toLocaleString("pt-BR")}{" "}
          </p>{" "}
          <div className="w-72 h-72 mx-auto">
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
