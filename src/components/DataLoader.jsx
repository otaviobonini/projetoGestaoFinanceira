import { useEffect } from "react";
import { useMetas } from "../hooks/useMetas";
import { useCategorias } from "../hooks/useCategorias";
import { useTransacoes } from "../hooks/useTransacoes";
import { useContext } from "react";
import { AuthContext } from "../store/authContext";

export default function InitialDataLoader({ children }) {
  const { fetchMetas } = useMetas();
  const { fetchCategorias } = useCategorias();
  const { fetchTransacoes } = useTransacoes();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      fetchTransacoes();
    }
  }, [fetchTransacoes, token]);

  useEffect(() => {
    if (token) {
      fetchCategorias();
    }
  }, [fetchCategorias, token]);

  useEffect(() => {
    if (token) {
      fetchMetas();
    }
  }, [fetchMetas, token]);

  return children;
}
