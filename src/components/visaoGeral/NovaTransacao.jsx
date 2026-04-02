import { useState, useRef } from "react";
import { useTransacoes } from "../../hooks/useTransacoes";
import { useCategorias } from "../../hooks/useCategorias";
import { createPortal } from "react-dom";
export default function NovaTransacao() {
  const [showForm, setShowForm] = useState(false);
  const [tipo, setTipo] = useState("entrada");
  const { addTransacao } = useTransacoes();
  const { categorias } = useCategorias();
  const [valor, setValor] = useState(0);
  const [error, setError] = useState(false);

  const categoria = useRef();
  const descricao = useRef();
  function handleSubmit() {
    const valorInput = valor;
    const descricaoInput = descricao.current.value;
    const categoriaInput = categoria.current.value;

    if (valorInput <= 0 || !categoriaInput) {
      setError(true);
      return;
    }

    addTransacao(valorInput, categoriaInput, tipo, descricaoInput);
    setValor(0);
    setShowForm(false);
    descricao.current.value = "";
    categoria.current.selectedIndex = 0;
  }
  function handleChange(value) {
    const numero = Number(value);
    if (numero <= 0) {
      return setError(true);
    }
    setError(false);
    return setValor(numero);
  }

  return (
    <>
      {" "}
      <button
        className="bg-green-400 text-black  text-lg font-semibold px-4 py-2  rounded-2xl shadow-lg  hover:bg-green-600 transtion duration-500 "
        onClick={() => setShowForm(!showForm)}
      >
        {" "}
        + Nova Transação{" "}
      </button>{" "}
      {showForm &&
        createPortal(
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50 px-4">
            <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg">
              {" "}
              <div className="py-2">
                <h1 className="font-semibold text-lg ">Nova Transação.</h1>
                <p className="mb-2 ">Registre uma entrada ou saída</p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setTipo("entrada");
                  }}
                  className={
                    tipo === "entrada"
                      ? "bg-green-600 text-white p-2 rounded-xl w-full font-semibold  hover:bg-green-700"
                      : "bg-green-400 text-white p-2 w-full rounded-xl  hover:bg-green-500"
                  }
                >
                  Entrada
                </button>
                <button
                  className={
                    tipo === "saida"
                      ? "bg-red-600 text-white p-2 rounded-xl w-full font-semibold  hover:bg-red-700"
                      : "bg-red-400 text-white p-2 w-full rounded-xl  hover:bg-red-500"
                  }
                  onClick={() => {
                    setTipo("saida");
                  }}
                >
                  Saída
                </button>
              </div>
              {error && (
                <p className="text-red-500 w-full font-semibold text-sm mt-2">
                  Insira um valor maior que zero
                </p>
              )}
              <input
                onChange={(e) => {
                  handleChange(e.target.value);
                }}
                type="number"
                placeholder="R$ 0.00"
                className="border border-gray-300 rounded-2xl focus:ring-1 focus:ring-green-500 focus:outline-none    px-4 py-2 mt-2 w-full"
              />{" "}
              <input
                ref={descricao}
                type="text"
                placeholder="Descrição (opcional)"
                className="border border-gray-300 rounded-2xl  px-4 py-2 mt-4 w-full focus:ring-1 focus:ring-green-500 focus:outline-none"
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
              <div className="flex gap-2">
                <button
                  disabled={categorias.length <= 0 || error}
                  onClick={() => {
                    handleSubmit();
                  }}
                  className="bg-green-500  mt-4 text-white px-4 py-2 rounded-xl w-full hover:bg-green-600 transition duration-200 "
                >
                  Concluir{" "}
                </button>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setError(false);
                  }}
                  className="bg-gray-300  mt-4 text-black px-4 py-2 rounded-xl w-full hover:bg-gray-400 transition duration-200 "
                >
                  Cancelar
                </button>{" "}
              </div>
            </div>
          </div>,
          document.getElementById("modal"),
        )}{" "}
    </>
  );
}
