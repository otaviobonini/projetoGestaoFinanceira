import { useCallback, useContext } from "react";
import { AuthContext } from "../store/authContext";
import { CategoriasContext } from "../store/categoriasContext";
import {
  addCategoria as addCategoriaService,
  deleteCategoria as deleteCategoriaService,
  fetchCategorias as fetchCategoriasService,
} from "../services/categoriaService";

export function useCategorias() {
  const { setCategorias, setLoading, categorias, loading } =
    useContext(CategoriasContext);
  const { token } = useContext(AuthContext);

  const fetchCategorias = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await fetchCategoriasService(token);
      setCategorias(data);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    } finally {
      setLoading(false);
    }
  }, [token, setCategorias, setLoading]);

  const addCategoria = useCallback(
    async (nome, orcamento) => {
      if (!orcamento || orcamento <= 0) return;

      try {
        const data = await addCategoriaService(token, nome, orcamento);
        setCategorias((prev) => [...prev, data]);
        return data;
      } catch (error) {
        console.error("Erro ao adicionar categoria:", error);
      }
    },
    [token, setCategorias],
  );

  const deleteCategoria = useCallback(
    async (id) => {
      try {
        const data = await deleteCategoriaService(token, id);
        setCategorias((prev) => prev.filter((c) => c.id !== data.id));
        return data;
      } catch (error) {
        console.error("Erro ao deletar categoria:", error);
      }
    },
    [token, setCategorias],
  );

  return {
    categorias,
    loading,
    fetchCategorias,
    addCategoria,
    deleteCategoria,
  };
}
