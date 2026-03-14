import { useState, useRef } from "react";
import { useContext } from "react";
import { TransactionContext } from "../../store/transctionsContext";
export default function NovoSaldo() {
  const [showForm, setShowForm] = useState(false);
  const { addTransacao } = useContext(TransactionContext);
  const valor = useRef();
  function handleSubmit() {
    const valorInput = valor.current.value;
    const categoriaInput = "Saldo";
    const tipo = "entrada";
    addTransacao(valorInput, categoriaInput, tipo);
  }

  return (
    <>
      {" "}
      <button
        className="bg-green-400 text-black w- text-lg font-semibold px-4 py-2  rounded-lg shadow-lg  hover:bg-green-600"
        onClick={() => setShowForm(!showForm)}
      >
        {" "}
        + Adicionar saldo{" "}
      </button>{" "}
      {showForm && (
        <dialog
          open={showForm}
          className="bg-white h-82 p-6 rounded-lg shadow-lg mt-4 absolute backdrop-blur-sm"
        >
          {" "}
          <p>Insira os dados do seu novo saldo</p>
          <input
            ref={valor}
            type="number"
            placeholder="Digite o valor da entrada"
            className="border border-gray-300 rounded-lg px-4 py-2 mt-4 w-72"
          />{" "}
          <button
            onClick={() => {
              handleSubmit();
              setShowForm(false);
            }}
            className="bg-green-500 flex mt-4 text-white px-4 py-2 rounded-lg"
          >
            Concluir{" "}
          </button>
          <button
            onClick={() => {
              setShowForm(false);
            }}
            className="bg-gray-300 flex mt-4 text-black px-4 py-2 rounded-lg"
          >
            Cancelar
          </button>{" "}
        </dialog>
      )}{" "}
    </>
  );
}
