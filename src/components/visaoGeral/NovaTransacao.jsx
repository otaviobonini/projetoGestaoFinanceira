import { useState, useRef } from "react";
import { useContext } from "react";
import { TransactionContext } from "../../store/transctionsContext";
export default function NovaTransacao() {
  const [showForm, setShowForm] = useState(false);
  const [tipo, setTipo] = useState("entrada");
  const { addTransacao, categorias } = useContext(TransactionContext);
  const valor = useRef();
  const categoria = useRef();
  function handleSubmit() {
    const valorInput = valor.current.value;
    const categoriaInput = categoria.current.value;
    addTransacao(valorInput, categoriaInput, tipo);
  }

  return (
    <>
      {" "}
      <button
        className="bg-green-400 text-black  text-lg font-semibold px-4 py-2  rounded-lg shadow-lg  hover:bg-green-600"
        onClick={() => setShowForm(!showForm)}
      >
        {" "}
        + Nova Transação{" "}
      </button>{" "}
      {showForm && (
        <dialog
          open={showForm}
          className="bg-white h-82 p-6 rounded-lg shadow-lg mt-4 absolute backdrop-blur-sm"
        >
          {" "}
          <p>Insira os dados da sua nova transação</p>
          <div className="space-x-8 p-4">
            <button
              onClick={() => {
                setTipo("entrada");
              }}
              className={
                tipo === "entrada"
                  ? "bg-green-600 text-white p-2 rounded-lg font-semibold"
                  : "bg-green-400 text-white p-2 rounded-lg"
              }
            >
              Entrada
            </button>
            <button
              className={
                tipo === "saida"
                  ? "bg-red-600 text-white p-2 rounded-lg font-semibold"
                  : "bg-red-400 text-white p-2 rounded-lg"
              }
              onClick={() => {
                setTipo("saida");
              }}
            >
              Saída
            </button>
          </div>
          <input
            ref={valor}
            type="number"
            placeholder="Digite o valor da transação"
            className="border border-gray-300 rounded-lg px-4 py-2 mt-4 w-72"
          />{" "}
          <p className="mt-4">Insira a categoria da transação</p>{" "}
          {categorias.length > 0 ? (
            <select
              className="block py-2.5 ps-0 w-full text-sm text-body bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
              ref={categoria}
            >
              {categorias.map((cat) => (
                <option key={cat.id}>{cat.nome}</option>
              ))}
            </select>
          ) : (
            <p className="font-bold">
              Crie as suas categorias na aba categorias
            </p>
          )}
          <div className="flex gap-24">
            <button
              disabled={categorias.length <= 0}
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
          </div>
        </dialog>
      )}{" "}
    </>
  );
}
