import { useState, useRef } from "react";
import { useContext } from "react";
import { TransactionContext } from "../../store/transctionsContext"; // ou outro context que você criar para metas
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function NovaMeta() {
  const [showForm, setShowForm] = useState(false);
  const nomeMetaRef = useRef();
  const descMetaRef = useRef();
  const objetivoMetaRef = useRef();
  const dataConclusaoMetaRef = useRef();
  const { addMeta } = useContext(TransactionContext); // função que você vai criar no context

  function handleSubmit() {
    const nome = nomeMetaRef.current.value;
    const desc = descMetaRef.current.value;
    const obj = objetivoMetaRef.current.value;
    const data = dataConclusaoMetaRef.current.value;

    addMeta(nome, desc, obj, data);
    setShowForm(false);
  }

  return (
    <>
      <div className="bg-gray-200 p-4 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300  w-full sm:w-80">
        <button
          className="bg-white font-medium text-black text-lg py-3 px-4 rounded-full  hover:bg-green-400 transition"
          onClick={() => setShowForm(true)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <h1 className="font-bold">Nova Meta</h1>
        <p className="text-gray-500 text-sm text-center">
          Defina um objetivo financeiro
        </p>
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 px-4">
          <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
            <p className="font-semibold text-lg">
              Insira os dados da nova meta
            </p>

            <input
              ref={nomeMetaRef}
              type="text"
              placeholder="Nome da meta"
              className="border border-gray-300 rounded-lg px-4 py-2 mt-4 w-full"
            />

            <input
              ref={descMetaRef}
              type="text"
              placeholder="Descrição da meta"
              className="border border-gray-300 rounded-lg px-4 py-2 mt-4 w-full"
            />

            <input
              ref={dataConclusaoMetaRef}
              type="date"
              placeholder="Data para conclusão da meta"
              className="border border-gray-300 rounded-lg px-4 py-2 mt-4 w-full"
            />

            <input
              ref={objetivoMetaRef}
              type="number"
              placeholder="Valor da meta"
              className="border border-gray-300 rounded-lg px-4 py-2 mt-4 w-full"
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
