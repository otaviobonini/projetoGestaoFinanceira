import { useContext } from "react";
import { TransactionContext } from "../../store/transactionsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function UltimasTransacoes() {
  const { transacoes, deleteTransacao } = useContext(TransactionContext);

  function handleDelete(id) {
    deleteTransacao(id);
  }
  return (
    <div className=" mt-8 w-[360px]  sm:w-full  overflow-x-auto   bg-white py-8 rounded-2xl shadow-md ">
      <h1 className="text-2xl px-8 font-bold mb-2">Últimas Transações</h1>
      <p className="text-gray-500 px-8 mb-6">
        Aqui estão as suas últimas transações.
      </p>

      <div className="w-full   rounded-xl border border-gray-100">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wide">
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
            {transacoes && transacoes.length > 0 ? (
              [...transacoes].reverse().map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
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
                  <td className="px-6 py-4 capitalize">{item.tipo}</td>
                  <td className="px-6 py-4">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {item.categoria?.nome || "Saldo"}
                    </span>
                  </td>
                  <td className="px-6 py-4 capitalize">{item.descricao}</td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString("pt-BR")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-8 text-gray-400">
                  Nenhuma transação ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
