import { useState, useRef } from "react";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { CategoriasContext } from "../../store/categoriasContext";
import { createPortal } from "react-dom";

export default function NovaCategoria() {
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(false);
  const categoriaRef = useRef();
  const orcamentoRef = useRef();
  const { addCategoria } = useContext(CategoriasContext);

  function handleSubmit() {
    setError(false);
    const novaCategoria = categoriaRef.current.value;
    const novoOrcamento = orcamentoRef.current.value;

    if (!novaCategoria.trim() || !novoOrcamento.trim()) {
      setError(true);
      return;
    }

    addCategoria(novaCategoria, novoOrcamento);

    categoriaRef.current.value = "";
    setShowForm(false);
  }

  return (
    <>
      <div className="bg-gray-200 p-4 flex flex-col items-center max-w-fit  justify-center rounded-2xl border-2 border-dashed border-gray-300">
        <button
          className="bg-white font-medium text-black text-lg py-3 px-4 rounded-full hover:bg-green-400"
          onClick={() => setShowForm(true)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <h1 className="font-bold">Novas Categorias</h1>
        <p className="text-gray-500 text-center">
          Defina suas categorias de gastos e seu orçamento
        </p>
      </div>
      {showForm &&
        createPortal(
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 px-4 ">
            <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
              <p className="font-semibold text-lg">
                Insira o nome da nova categoria.
              </p>

              <input
                ref={categoriaRef}
                type="text"
                placeholder="Digite o nome da categoria"
                className="border border-gray-300 rounded-lg px-4 py-2 mt-4 w-72"
              />

              <input
                ref={orcamentoRef}
                type="number"
                placeholder="Digite o seu orçamento"
                className="border border-gray-300 rounded-lg px-4 py-2 mt-4 w-72"
              />
              {error && (
                <p className="text-red-500 font-semibold px-2 mt-2">
                  Insira dados válidos.
                </p>
              )}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
                >
                  Concluir
                </button>

                <button
                  onClick={() => {
                    setShowForm(false);
                    setError(false);
                  }}
                  className="bg-gray-300 px-4 py-2 rounded-lg w-full"
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
