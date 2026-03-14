import { useState, useRef } from "react";
import { useContext } from "react";
import { TransactionContext } from "../../store/transctionsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function NovaCategoria() {
  const [showForm, setShowForm] = useState(false);
  const categoriaRef = useRef();
  const orcamentoRef = useRef();
  const { addCategoria } = useContext(TransactionContext);

  function handleSubmit() {
    const novaCategoria = categoriaRef.current.value;
    const novoOrcamento = orcamentoRef.current.value;

    if (!novaCategoria.trim()) return;

    addCategoria(novaCategoria, novoOrcamento);

    categoriaRef.current.value = "";
    setShowForm(false);
  }

  return (
    <>
      <div className="bg-gray-200 p-4 flex flex-col items-center w-2/3 justify-center rounded-2xl border-2 border-dashed border-gray-300">
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
      {showForm && (
        <dialog
          open
          className="bg-white h-52 p-6 rounded-lg shadow-lg mt-4 absolute backdrop-blur-sm"
        >
          <p>Insira o nome da nova categoria</p>

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

          <div className="flex gap-2 mt-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Concluir
            </button>

            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-300 px-4 py-2 rounded-lg"
            >
              Cancelar
            </button>
          </div>
        </dialog>
      )}
    </>
  );
}
