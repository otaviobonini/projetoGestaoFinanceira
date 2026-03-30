import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./authContext";

export const TransactionContext = createContext({
  transacoes: [],
  mes: 0,
  loading: true,
  handleMes: () => {},
  addTransacao: () => {},
  deleteTransacao: () => {},
});

export default function TransactionProvider({ children }) {
  const dataAtual = new Date();
  const mesAtual = dataAtual.getMonth();
  const [mes, setMes] = useState(mesAtual);
  const [loading, setLoading] = useState(true);
  const [transacoes, setTransacoes] = useState([]);
  const { token } = useContext(AuthContext);
  const apiUrl = import.meta.env.VITE_API_URL;

  async function fetchTransactions() {
    if (!token) return;
    try {
      setLoading(true);

      const transacoesRes = await fetch(`${apiUrl}/transactions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const transacoesData = await transacoesRes.json();
      setTransacoes(transacoesData);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, [token]);

  async function addTransacao(valor, categoriaNome, tipo, descricao) {
    if (valor === undefined || valor <= 0) {
      return;
    }

    const valorNumerico = parseFloat(valor);

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

  async function deleteTransacao(id) {
    if (!id) {
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/transactions/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Erro ao excluir transação");
      }

      setTransacoes((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  function handleMes(mes) {
    setMes(mes);
  }

  const ctxValue = {
    transacoes,
    mes,
    loading,
    handleMes,
    addTransacao,
    deleteTransacao,
  };

  return (
    <TransactionContext.Provider value={ctxValue}>
      {children}
    </TransactionContext.Provider>
  );
}
