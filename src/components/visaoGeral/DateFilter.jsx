import { useContext } from "react";
import { TransactionContext } from "../../store/transctionsContext";

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

  const { handleMes, mes, transacoes } = useContext(TransactionContext);

  function handleChange(e) {
    const novoMes = Number(e.target.value);
    handleMes(novoMes);
  }
  const mesesComTransacoes = [
    ...new Set(transacoes.map((t) => new Date(t.createdAt).getMonth())),
  ];

  if (mesesComTransacoes.length === 0) return null;

  return (
    <select
      value={mes}
      onChange={handleChange}
      className="bg-white border rounded-lg p-2 font-semibold"
    >
      {mesesComTransacoes.map((mesIndex) => (
        <option key={mesIndex} value={mesIndex}>
          {meses[mesIndex]}
        </option>
      ))}
    </select>
  );
}
