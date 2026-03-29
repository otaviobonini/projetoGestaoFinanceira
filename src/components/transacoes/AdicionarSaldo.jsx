import { useState, useRef } from "react";
import { useContext } from "react";
import { TransactionContext } from "../../store/transactionsContext";
import { createPortal } from "react-dom";
export default function NovoSaldo() {
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(false);
  const { addTransacao } = useContext(TransactionContext);
  const valorRef = useRef();
  function handleSubmit() {
    setError(false);
    const valor = Number(valorRef.current.value);
    const tipo = "entrada";
    if (valor <= 0) {
      setError(true);
      return;
    }
    addTransacao(valor, null, tipo);
    setShowForm(false);
  }

  return (
    <>
      {" "}
      <button
        className="bg-green-400 text-black text-lg font-semibold px-4 py-2  rounded-md shadow-lg  hover:bg-green-600"
        onClick={() => setShowForm(!showForm)}
      >
        {" "}
        + Adicionar saldo{" "}
      </button>{" "}
      {showForm &&
        createPortal(
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 px-4">
            <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg">
              {" "}
              <div className="py-2">
                <h1 className="font-semibold text-lg">Adicionar Valor</h1>
                <p>Insira o valor que deseja adicionar ao saldo.</p>
              </div>
              <input
                ref={valorRef}
                type="number"
                onChange={() => setError(false)}
                placeholder="Digite o valor da entrada"
                className="border border-gray-300 rounded-2xl px-4 py-2 mt-4 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
              />{" "}
              {error && (
                <p className="text-red-500 font-semibold">
                  Insira um valor maior que 0.
                </p>
              )}
              <div className="flex mt-4 gap-4">
                <button
                  onClick={handleSubmit}
                  className="bg-green-500  text-white px-4 py-2 rounded-2xl w-full transition duration-500 hover:bg-green-600"
                >
                  Concluir
                </button>

                <button
                  onClick={() => {
                    setShowForm(false);
                    setError(false);
                  }}
                  className="bg-gray-200 px-4 py-2 rounded-2xl w-full transition duration-500 hover:bg-gray-300"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>,
          document.getElementById("modal"),
        )}{" "}
    </>
  );
}
