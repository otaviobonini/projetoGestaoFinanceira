import { useState, useRef } from "react";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { MetasContext } from "../../store/metasContext";
import { createPortal } from "react-dom";

export default function NovaMeta() {
  const [showForm, setShowForm] = useState(false);
  const nomeMetaRef = useRef();
  const descMetaRef = useRef();
  const objetivoMetaRef = useRef();
  const dataConclusaoMetaRef = useRef();
  const [error, setError] = useState(false);
  const { addMeta } = useContext(MetasContext);

  function handleSubmit() {
    setError(false);
    const nome = nomeMetaRef.current.value;
    const desc = descMetaRef.current.value;
    const obj = objetivoMetaRef.current.value;
    const data = dataConclusaoMetaRef.current.value;
    if (!nome || obj <= 0 || !data || !desc) {
      return setError(true);
    }

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

      {showForm &&
        createPortal(
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 px-4 ">
            <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
              <p className="font-semibold text-lg text-center">
                Criar Nova Meta
              </p>
              {error && (
                <p className="text-red-500 text-sm mt-2 font-semibold">
                  Insira dados válidos.
                </p>
              )}
              <p className="font-semibold">Nome da Meta</p>
              <input
                ref={nomeMetaRef}
                type="text"
                onChange={() => setError(false)}
                placeholder="Ex: Viajar para a Europa"
                className="border border-gray-300 rounded-lg px-4 py-2 mt-2 w-full focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
              <p className="font-semibold mt-2">Descrição da Meta</p>
              <input
                ref={descMetaRef}
                onChange={() => setError(false)}
                type="text"
                placeholder="Ex: Economizar para viagem"
                className="border border-gray-300 rounded-lg px-4 py-2 mt-2 w-full focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />

              <p className="font-semibold mt-2">Data para Conclusão da meta</p>
              <input
                ref={dataConclusaoMetaRef}
                type="date"
                onChange={() => setError(false)}
                placeholder="Data para conclusão da meta"
                className="border border-gray-300 rounded-lg px-4 py-2 mt-2 w-full focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
              <p className="font-semibold mt-2">Valor da Meta</p>
              <input
                ref={objetivoMetaRef}
                type="number"
                onChange={() => setError(false)}
                placeholder="Valor da meta"
                className="border border-gray-300 rounded-lg px-4 py-2 mt-2 w-full focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />

              <div className="flex gap-2 mt-4">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 transition duration-300"
                >
                  Concluir
                </button>

                <button
                  onClick={() => {
                    setShowForm(false);
                    setError(false);
                  }}
                  className="border px-4 py-2 rounded-lg w-full hover:bg-gray-300  hover:border transition duration-300"
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
