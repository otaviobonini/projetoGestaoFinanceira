import { useContext, useMemo } from "react";
import { faPiggyBank } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Skeleton from "../Skeleton";
import { TransactionContext } from "../../store/transactionsContext";
import { CategoriasContext } from "../../store/categoriasContext";
export default function VisaoGastosTotais() {
  const { transacoes, loading } = useContext(TransactionContext);
  const { categorias } = useContext(CategoriasContext);
  const dataAtual = new Date();
  const mesAtual = dataAtual.getMonth();
  const orcamentoTotal = categorias
    .map((cat) => Number(cat.orcamento))
    .reduce((acc, curr) => acc + curr, 0);

  const gastoTotal = useMemo(() => {
    const categoriaId = categorias.map((categoria) => categoria.id);
    return transacoes

      .filter(
        (t) =>
          t.tipo === "saida" &&
          categoriaId.includes(t.categoriaId) &&
          new Date(t.createdAt).getMonth() === mesAtual,
      )
      .reduce((acc, t) => acc + Number(t.valor), 0);
  }, [transacoes, categorias, mesAtual]);
  let barColor = "";
  let textColor = "";
  const percent = orcamentoTotal > 0 ? (gastoTotal / orcamentoTotal) * 100 : 0;

  if (percent < 50) {
    barColor = "bg-green-500";
    textColor = "text-green-500";
  } else if (percent < 80) {
    barColor = "bg-yellow-500";
    textColor = "text-yellow-500";
  } else {
    barColor = "bg-red-500";
    textColor = "text-red-500";
  }
  return (
    <div className="p-8 mt-4 bg-white  max-w-3xl  rounded-2xl">
      <p className="uppercase font-semibold  text-gray-500">
        Visão mensal total
      </p>
      <div className="flex">
        {loading ? (
          <Skeleton className="w-40 h-8"></Skeleton>
        ) : (
          <h1 className="font-bold text-2xl sm:text-3xl">
            R${" "}
            {gastoTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}{" "}
            <label className="text-lg font-normal text-gray-400">
              /R${" "}
              {orcamentoTotal.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </label>
          </h1>
        )}
        <label className=" w-12 h-12 ml-auto flex items-center justify-center sm:w-16 sm:h-16 bg-blue-300 rounded-full">
          <FontAwesomeIcon
            className=" text-2xl sm:text-4xl text-blue-600"
            icon={faPiggyBank}
          />
        </label>
      </div>

      <p className="font-semibold">Progresso Geral</p>
      {/* Barra de progresso */}
      <p className={`font-bold text-xl text-right ${textColor}`}>
        {percent.toFixed(2)}%
      </p>
      <div>
        <div className="bg-gray-300 h-4 rounded-full mb-2 mt-2 overflow-hidden">
          <div
            className={`h-4 rounded-full transition-all duration-500 ${barColor}`}
            style={{ width: `${percent}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
