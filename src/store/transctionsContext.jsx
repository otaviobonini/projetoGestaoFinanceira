import { createContext, useEffect, useState } from "react";

export const TransactionContext = createContext({
  categorias: [],
  transacoes: [],
  metas: [],
  saldo: 0,
  mes: 0,
  handleMes: () => {},
  addTransacao: () => {},
  handleButtonClick: () => {},
  addCategoria: () => {},
  addMeta: () => {},
  addValorMeta: () => {},
});

export default function TransactionProvider({ children }) {
  const dataAtual = new Date();
  const mesAtual = dataAtual.getMonth();
  const [saldo, setSaldo] = useState(0);
  const [mes, setMes] = useState(mesAtual);
  const [categorias, setCategorias] = useState([]);
  const [transacoes, setTransacoes] = useState([]);
  const [metas, setMetas] = useState([]);
  const token = getAuthToken();
  const apiUrl = import.meta.env.VITE_API_URL;
  async function fetchData() {
    if (!token) return;
    try {
      const transacoesRes = await fetch(`${apiUrl}/transactions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const transacoesData = await transacoesRes.json();
      setTransacoes(transacoesData);

      const metasRes = await fetch(`${apiUrl}/metas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const metasData = await metasRes.json();
      setMetas(metasData);

      const categoriasRes = await fetch(`${apiUrl}/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const categoriasData = await categoriasRes.json();
      setCategorias(categoriasData);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [token]);

  async function addTransacao(valor, categoriaNome, tipo, descricao) {
    if (valor === undefined || valor <= 0) {
      return;
    }
    const valorNumerico = parseFloat(valor);

    if (tipo === "entrada") {
      setSaldo((prevSaldo) => prevSaldo + valorNumerico);
    } else {
      setSaldo((prevSaldo) => prevSaldo - valorNumerico);
    }
    try {
      const res = await fetch(`${apiUrl}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          valor: valorNumerico,
          categoriaNome,
          tipo,
          descricao,
        }),
      });
      const data = await res.json();
      setTransacoes((prev) => [...prev, data]);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
  function getAuthToken() {
    const token = localStorage.getItem("token");
    return token;
  }

  async function addMeta(nome, desc, obj, data) {
    if (nome === undefined || obj <= 0) {
      return;
    }

    try {
      const newMeta = await fetch(`${apiUrl}/metas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome,
          objetivo: Number(obj),
          descMeta: desc,
          dataConclusao: data,
        }),
      });
      const responseData = await newMeta.json();
      setMetas((prev) => [...prev, responseData]);
      return data;
    } catch (err) {
      console.log(err.erro);
    }
  }

  async function deleteCategoria(id) {
    try {
      const deletedCategoria = await fetch(`${apiUrl}/categories/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const deleteData = await deletedCategoria.json();
      setCategorias((prev) =>
        prev.filter((categoria) => categoria.id !== deleteData.id),
      );
      return deleteData;
    } catch (err) {
      console.log(err.erro);
    }
  }

  async function deleteMeta(id) {
    try {
      const deletedMeta = await fetch(`${apiUrl}/metas/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const deleteData = await deletedMeta.json();
      setMetas((prev) => prev.filter((meta) => meta.id !== deleteData.id));
      return deleteData;
    } catch (err) {
      console.log(err.erro);
    }
  }

  function handleMes(mes) {
    setMes(mes);
  }

  async function addValorMeta(valor, id) {
    if (!valor || valor <= 0) return;

    const valorNumerico = Number(valor);

    try {
      const newMetaValue = await fetch(`${apiUrl}/metas/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id,
          valor: valorNumerico,
        }),
      });
      const res = await newMetaValue.json();
      setMetas((prevMetas) =>
        prevMetas.map((meta) =>
          meta.id === res.id
            ? { ...meta, valorGuardado: meta.valorGuardado + valorNumerico }
            : meta,
        ),
      );

      setSaldo((prevSaldo) => prevSaldo - valorNumerico);
      return res;
    } catch (err) {
      console.error(err);
    }
  }
  async function addCategoria(nomeCategoria, novoOrcamento) {
    if (novoOrcamento === undefined || novoOrcamento <= 0) {
      return;
    }
    try {
      const newCategoria = await fetch(`${apiUrl}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome: nomeCategoria,
          orcamento: Number(novoOrcamento),
        }),
      });
      const responseData = await newCategoria.json();
      setCategorias((prev) => [...prev, responseData]);
      return responseData;
    } catch (err) {
      console.log(err.erro);
    }
  }

  const ctxValue = {
    categorias,
    transacoes,
    saldo,
    metas,
    mes,
    handleMes,
    deleteMeta,
    addTransacao,
    getAuthToken,
    addCategoria,
    addMeta,
    addValorMeta,
    deleteCategoria,
  };

  return (
    <TransactionContext.Provider value={ctxValue}>
      {children}
    </TransactionContext.Provider>
  );
}
