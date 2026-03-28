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
        className="bg-green-400 text-black text-lg font-semibold px-4 py-2  rounded-lg shadow-lg  hover:bg-green-600"
        onClick={() => setShowForm(!showForm)}
      >
        {" "}
        + Adicionar saldo{" "}
      </button>{" "}
      {showForm &&
        createPortal(
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 px-4">
            <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
              {" "}
              <p className="font-semibold text-lg">
                Insira os dados do seu novo saldo.
              </p>
              <input
                ref={valorRef}
                type="number"
                onChange={() => setError(false)}
                placeholder="Digite o valor da entrada"
                className="border border-gray-300 rounded-lg px-4 py-2 mt-4 w-72"
              />{" "}
              {error && (
                <p className="text-red-500 font-semibold">
                  Insira um valor maior que 0.
                </p>
              )}
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    handleSubmit();
                  }}
                  className="bg-green-500  mt-4 text-white  px-4 py-2 rounded-lg w-full"
                >
                  Concluir{" "}
                </button>
                <button
                  onClick={() => {
                    {
                      setShowForm(false);
                      setError(false);
                    }
                  }}
                  className="bg-gray-300  mt-4 text-black px-4 py-2 rounded-lg w-full"
                >
                  Cancelar
                </button>{" "}
              </div>
            </div>
          </div>,
          document.getElementById("modal"),
        )}{" "}
    </>
  );
}
