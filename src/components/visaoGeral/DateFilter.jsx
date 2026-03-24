import { useContext } from "react";
import { TransactionContext } from "../../store/transctionsContext";
import Skeleton from "../Skeleton";

export default function DateFilter() {
  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const { handleMes, mes, transacoes, loading } =
    useContext(TransactionContext);

  function handleChange(e) {
    const novoMes = Number(e.target.value);
    handleMes(novoMes);
  }
  const mesesComTransacoes = [
    ...new Set(transacoes.map((t) => new Date(t.createdAt).getMonth())),
  ];

  if (mesesComTransacoes.length === 0) return null;

  return (
    loading && (
      <select
        value={mes}
        onChange={handleChange}
        className="bg-white 
    border border-gray-300 
    rounded-xl 
    px-4 py-2 
    font-medium 
    text-gray-700 
    shadow-sm
    hover:border-gray-400
    
   
    cursor-pointer
  "
      >
        {mesesComTransacoes.map((mesIndex) => (
          <option key={mesIndex} value={mesIndex}>
            {meses[mesIndex]}
          </option>
        ))}
      </select>
    )
  );
}
