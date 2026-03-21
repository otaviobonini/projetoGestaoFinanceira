import { useContext } from "react";
import { TransactionContext } from "../../store/transctionsContext";
export default function CategoriasContainers({
  nomeCategoria,
  orcamento,
  gasto,
  id,
}) {
  const { deleteCategoria } = useContext(TransactionContext);
  async function handleDelete() {
    await deleteCategoria(id);
  }
  // Converte "R$ 100,00" para número
  const orcamentoNum = parseFloat(orcamento);
  const gastoNum = parseFloat(gasto);

  // Calcula o percentual gasto, limitado a 100%
  const percent = Math.round((gastoNum / orcamentoNum) * 100);

  // Define a cor da barra conforme o percentual
  const textColor =
    percent < 70
      ? "text-green-500"
      : percent < 100
        ? "text-yellow-400"
        : "text-red-500";

  const barColor =
    percent < 70
      ? "bg-green-500"
      : percent < 100
        ? "bg-yellow-400"
        : "bg-red-500";

  return (
    <div className="bg-white w-80 p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-start ">
        <h1 className="text-2xl font-bold mb-4"> {nomeCategoria}</h1>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white h-fit  w-fit p-2 rounded-md hover:bg-red-700"
        >
          Deletar
        </button>
      </div>
      <p className="text-gray-500 mb-2">
        Orçamento: R$ {orcamento.toLocaleString("pt-BR")}
      </p>
      <h2 className="font-semibold mb-4">
        Gasto: R$ {gasto.toLocaleString("pt-BR")}
      </h2>

      {/* Barra de progresso */}
      <div className="bg-gray-300  rounded-full overflow-hidden">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <p className={`font-bold text-right ${textColor}`}>
        {percent.toFixed(2)}%
      </p>
    </div>
  );
}
