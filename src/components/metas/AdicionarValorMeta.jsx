import { useState, useRef, useContext } from "react";
import { TransactionContext } from "../../store/transctionsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function AdicionarValorMeta({ metaId }) {
  const [showForm, setShowForm] = useState(false);
  const guardarValorMetaRef = useRef();
  const { addValorMeta } = useContext(TransactionContext);

  function handleSubmit() {
    const valorGuardado = guardarValorMetaRef.current.value;

    if (!valorGuardado || valorGuardado <= 0) return;

    addValorMeta(valorGuardado, metaId);

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

      {showForm && (
        <dialog
          open
          className="bg-white h-56 p-6 rounded-lg shadow-lg absolute"
        >
          <p>Insira o valor que deseja guardar na meta</p>

          <input
            ref={guardarValorMetaRef}
            type="number"
            placeholder="Valor a ser guardado"
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
