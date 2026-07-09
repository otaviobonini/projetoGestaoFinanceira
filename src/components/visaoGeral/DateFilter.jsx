import { useContext } from "react";
import { TransactionContext } from "../../store/transactionsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

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
    handleMes(Number(e.target.value));
  }

  const mesesComTransacoes = [
    ...new Set(transacoes.map((t) => new Date(t.createdAt).getMonth())),
  ];

  if (mesesComTransacoes.length === 0 || loading) return null;

  return (
    <div className="inline-flex items-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-2 shadow-sm">
      <FontAwesomeIcon icon={faCalendar} className="text-gray-500" />

      <select
        value={mes}
        onChange={handleChange}
        className="cursor-pointer bg-transparent font-medium text-gray-700 outline-none"
      >
        {mesesComTransacoes.map((mesIndex) => (
          <option key={mesIndex} value={mesIndex}>
            {meses[mesIndex]}
          </option>
        ))}
      </select>
    </div>
  );
}
