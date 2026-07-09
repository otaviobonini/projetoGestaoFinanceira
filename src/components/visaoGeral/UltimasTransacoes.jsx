import { useState } from "react";
import { useTransacoes } from "../../hooks/useTransacoes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function UltimasTransacoes() {
  const { transacoes, deleteTransacao } = useTransacoes();

  const [visibleItems, setVisibleItems] = useState(10);

  function handleDelete(id) {
    deleteTransacao(id);
  }

  const sortedTransactions = [...(transacoes || [])].reverse();
  const displayedTransactions = sortedTransactions.slice(0, visibleItems);

  return (
    <div className="mt-8 w-[360px] sm:w-full bg-white p-8 rounded-2xl shadow-md">
      <h1 className="text-2xl text-center font-bold mb-2">
        Últimas Transações
      </h1>
      <p className="text-gray-500  text-center px-8 mb-6">
        Aqui estão as suas últimas transações.
      </p>

      <div className="w-full overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500  text-sm uppercase tracking-wide">
            <tr>
              <th className="px-6 py-4">Ações</th>
              <th className="px-6 py-4">Valor</th>
              <th className="px-6 py-4">Operação</th>
              <th className="px-6 py-4">Categoria</th>
              <th className="px-6 py-4">Detalhes</th>
              <th className="px-6 py-4">Data</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {displayedTransactions.length > 0 ? (
              displayedTransactions.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors px-6 py-4"
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </td>

                  <td
                    className={`px-6 py-4 font-semibold ${
                      item.tipo === "saida" ? "text-red-500" : "text-green-600"
                    }`}
                  >
                    R${" "}
                    {Number(item.valor).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </td>

                  <td
                    className={`px-6 py-4 capitalize font-medium ${
                      item.tipo === "saida" ? "text-red-500" : "text-green-600"
                    }`}
                  >
                    {item.tipo}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                        item.tipo === "saida"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {item.categoria?.nome || "Saldo"}
                    </span>
                  </td>

                  <td className="px-6 py-4 capitalize text-gray-500">
                    {item.descricao}
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString("pt-BR")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400">
                  Nenhuma transação ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {sortedTransactions.length > 10 && (
        <div className="flex justify-center mt-6">
          {visibleItems < sortedTransactions.length ? (
            <button
              onClick={() => setVisibleItems((prev) => prev + 10)}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Ver mais
            </button>
          ) : (
            <button
              onClick={() => setVisibleItems(10)}
              className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Ver menos
            </button>
          )}
        </div>
      )}
    </div>
  );
}
