import {
  fetchTransacoes as fetchTransacoesService,
  addTransacao as addTransacaoService,
  deleteTransacao as deleteTransacaoService,
} from "../services/transacoesService";
import { useCallback, useContext } from "react";
import { AuthContext } from "../store/authContext";
import { TransactionContext } from "../store/transactionsContext";

export function useTransacoes() {
  const { token } = useContext(AuthContext);
  const { setTransacoes, setLoading, transacoes, loading } =
    useContext(TransactionContext);

  const fetchTransacoes = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchTransacoesService(token);
      setTransacoes(data);
    } catch (error) {
      console.error("Falha ao buscar Transações", error);
    } finally {
      setLoading(false);
    }
  }, [setTransacoes, token, setLoading]);

  const addTransacao = useCallback(
    async (valor, categoriaNome, tipo, descricao) => {
      try {
        const data = await addTransacaoService(
          token,
          valor,
          categoriaNome,
          tipo,
          descricao,
        );
        setTransacoes((prevTransacao) => [...prevTransacao, data]);
      } catch (error) {
        console.error("Falha ao crirar transação", error);
      }
    },
    [setTransacoes, token],
  );

  const deleteTransacao = useCallback(
    async (id) => {
      try {
        const data = await deleteTransacaoService(token, id);
        setTransacoes((prev) => prev.filter((p) => p.id !== data.id));
      } catch (error) {
        console.error("Falha ao deletar transação", error);
      }
    },
    [setTransacoes, token],
  );

  return {
    addTransacao,
    fetchTransacoes,
    deleteTransacao,
    transacoes,
    loading,
  };
}
