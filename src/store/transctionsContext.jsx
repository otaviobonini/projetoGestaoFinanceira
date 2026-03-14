import { createContext, useState } from "react";

export const TransactionContext = createContext({
  categorias: [],
  transacoes: [],
  metas: [],
  saldo: 0,
  activeButton: "Visão Geral",
  addTransacao: () => {},
  handleButtonClick: () => {},
  addCategoria: () => {},
  addMeta: () => {},
  addValorMeta: () => {},
});

export default function TransactionProvider({ children }) {
  const [saldo, setSaldo] = useState(0);
  const [activeButton, setActiveButton] = useState("Visão Geral");
  const [categorias, setCategorias] = useState([]);
  const [transacoes, setTransacoes] = useState([]);
  const [metas, setMetas] = useState([]);

  function addTransacao(valor, categoria, tipo) {
    if (valor === undefined || valor <= 0) {
      return;
    }
    const valorNumerico = parseFloat(valor);
    setTransacoes((prevTransacoes) => [
      ...prevTransacoes,
      {
        valor: valorNumerico,
        categoria,
        data: new Date().toLocaleDateString(),
        tipo,
      },
    ]);
    if (tipo === "entrada") {
      setSaldo((prevSaldo) => prevSaldo + valorNumerico);
    } else {
      setSaldo((prevSaldo) => prevSaldo - valorNumerico);
    }
  }
  function addMeta(nome, desc, obj, data) {
    if (nome === undefined || obj <= 0) {
      return;
    }
    const novaMeta = {
      id: crypto.randomUUID(),
      nome,
      obj,
      desc,
      data,
      valor: 0,
    };

    setMetas((prev) => [...prev, novaMeta]);
  }

  function addValorMeta(valor, id) {
    if (!valor || valor <= 0) return;

    const valorNumerico = Number(valor);

    setMetas((prevMetas) =>
      prevMetas.map((meta) =>
        meta.id === id ? { ...meta, valor: meta.valor + valorNumerico } : meta,
      ),
    );
    setSaldo((prevSaldo) => prevSaldo - valorNumerico);
  }
  function addCategoria(nomeCategoria, novoOrcamento) {
    if (novoOrcamento === undefined || novoOrcamento <= 0) {
      return;
    }
    const novaCategoria = {
      id: crypto.randomUUID(),
      nome: nomeCategoria,
      orcamento: Number(novoOrcamento),
    };

    setCategorias((prev) => [...prev, novaCategoria]);
  }

  function handleButtonClick(buttonName) {
    setActiveButton(buttonName);
  }

  const ctxValue = {
    categorias,
    transacoes,
    saldo,
    metas,
    activeButton,
    addTransacao,
    handleButtonClick,
    addCategoria,
    addMeta,
    addValorMeta,
  };

  return (
    <TransactionContext.Provider value={ctxValue}>
      {children}
    </TransactionContext.Provider>
  );
}
