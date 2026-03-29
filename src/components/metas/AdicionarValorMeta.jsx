import { useState, useRef, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { MetasContext } from "../../store/metasContext";
import { createPortal } from "react-dom";

export default function AdicionarValorMeta({ metaId }) {
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(false);
  const guardarValorMetaRef = useRef();
  const { addValorMeta } = useContext(MetasContext);

  function handleSubmit() {
    setError(false);
    const valorGuardado = guardarValorMetaRef.current.value;

    if (!valorGuardado || valorGuardado <= 0) {
      setError(true);
      return;
    }

    addValorMeta(valorGuardado, Number(metaId));

    guardarValorMetaRef.current.value = "";
    setShowForm(false);
  }

  return (
    <>
      <button
        className=" font-medium text-black text-sm   rounded-lg hover:text-green-500"
        onClick={() => setShowForm(true)}
      >
        <FontAwesomeIcon icon={faPlus} /> Adicionar Valor
      </button>

      {showForm &&
        createPortal(
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50 px-4">
            <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl">
              <h1 className="font-semibold text-lg py-4">Adicionar Valor</h1>
              <p className=" text-sm">Insira o valor que deseja guardar.</p>

              <input
                ref={guardarValorMetaRef}
                type="number"
                onChange={() => setError(false)}
                placeholder="Ex: 1500.00"
                className="border border-gray-300 rounded-2xl px-4 py-2 mt-4 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {error && (
                <p className="text-red-500 font-semibold">
                  Insira um valor válido.
                </p>
              )}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500  text-white px-4 py-2 rounded-2xl w-full transition duration-500 hover:bg-blue-700"
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
        )}
    </>
  );
}
