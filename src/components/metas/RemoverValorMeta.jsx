import { useState, useRef, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { MetasContext } from "../../store/metasContext";
import { createPortal } from "react-dom";

export default function RemoverValorMeta({ metaId }) {
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(false);
  const removerValorMetaRef = useRef();
  const { removeValorMeta, metas } = useContext(MetasContext);

  // Pegando o valor atual da meta para validação (opcional)
  const metaAtual = metas.find((m) => m.id === Number(metaId));

  function handleSubmit() {
    setError(false);
    const valorRemover = removerValorMetaRef.current.value;

    if (
      !valorRemover ||
      valorRemover <= 0 ||
      (metaAtual && valorRemover > metaAtual.valorGuardado)
    ) {
      setError(true);
      return;
    }

    removeValorMeta(valorRemover, Number(metaId));

    removerValorMetaRef.current.value = "";
    setShowForm(false);
  }

  return (
    <>
      <button
        className=" font-medium text-black text-sm rounded-lg hover:text-red-500"
        onClick={() => setShowForm(true)}
      >
        <FontAwesomeIcon icon={faMinus} /> Remover Valor
      </button>

      {showForm &&
        createPortal(
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50 px-4">
            <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl">
              <h1 className="font-semibold text-lg py-4">Remover Valor</h1>
              <p className=" text-sm">
                Insira o valor que deseja remover da meta.
              </p>

              <input
                ref={removerValorMetaRef}
                type="number"
                onChange={() => setError(false)}
                placeholder="Ex: 500.00"
                className="border border-gray-300 rounded-2xl px-4 py-2 mt-4 w-full focus:outline-none focus:ring-1 focus:ring-red-500"
              />
              {error && (
                <p className="text-red-500 font-semibold">
                  Insira um valor válido menor ou igual ao guardado.
                </p>
              )}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={handleSubmit}
                  className="bg-red-500  text-white px-4 py-2 rounded-2xl w-full transition duration-500 hover:bg-red-700"
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
