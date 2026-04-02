import { useEffect } from "react";
import { useMetas } from "../hooks/useMetas";
import { useCategorias } from "../hooks/useCategorias";
import { useTransacoes } from "../hooks/useTransacoes";

export default function InitialDataLoader({ children }) {
  const { fetchMetas } = useMetas();
  const { fetchCategorias } = useCategorias();
  const { fetchTransacoes } = useTransacoes();

  useEffect(() => {
    fetchTransacoes();
  }, [fetchTransacoes]);

  useEffect(() => {
    fetchCategorias();
  }, [fetchCategorias]);

  useEffect(() => {
    fetchMetas();
  }, [fetchMetas]);

  return children;
}
