import { useState, useRef, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { MetasContext } from "../../store/metasContext";

export default function AdicionarValorMeta({ metaId }) {
  const [showForm, setShowForm] = useState(false);
  const guardarValorMetaRef = useRef();
  const { addValorMeta } = useContext(MetasContext);

  function handleSubmit() {
    const valorGuardado = guardarValorMetaRef.current.value;

    if (!valorGuardado || valorGuardado <= 0) return;

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

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 px-4">
          <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
            <p className="font-semibold text-lg">
              Insira o valor à guardar na meta.
            </p>

            <input
              ref={guardarValorMetaRef}
              type="number"
              placeholder="Valor a ser guardado"
              className="border border-gray-300 rounded-lg px-4 py-2 mt-4 w-72"
            />

            <div className="flex gap-2 mt-4">
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
              >
                Concluir
              </button>

              <button
                onClick={() => setShowForm(false)}
                className="bg-gray-300 px-4 py-2 rounded-lg w-full"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
