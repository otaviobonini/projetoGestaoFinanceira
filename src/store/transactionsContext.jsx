import { createContext, useState } from "react";

export const TransactionContext = createContext({
  transacoes: [],
  mes: 0,
  loading: false,
  setTransacoes: () => {},
  setLoading: () => {},
  handleMes: () => {},
});

export default function TransactionProvider({ children }) {
  const dataAtual = new Date();
  const mesAtual = dataAtual.getMonth();

  const [mes, setMes] = useState(mesAtual);
  const [loading, setLoading] = useState(false);
  const [transacoes, setTransacoes] = useState([]);

  function handleMes(mes) {
    setMes(mes);
  }

  return (
    <TransactionContext.Provider
      value={{
        transacoes,
        setTransacoes,
        loading,
        setLoading,
        mes,
        handleMes,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
