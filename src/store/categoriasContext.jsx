import { createContext, useEffect, useState, useContext } from "react";
import { AuthContext } from "./authContext";

export const CategoriasContext = createContext({
  categorias: [],
  loading: true,
  addCategoria: () => {},
  deleteCategoria: () => {},
});

export default function CategoriasProvider({ children }) {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);
  const apiUrl = import.meta.env.VITE_API_URL;

  async function fetchCategorias() {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${apiUrl}/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setCategorias(data);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategorias();
  }, [token]);

  async function addCategoria(nomeCategoria, novoOrcamento) {
    if (!novoOrcamento || novoOrcamento <= 0) return;

    try {
      const res = await fetch(`${apiUrl}/categories`, {
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

      const data = await res.json();
      setCategorias((prev) => [...prev, data]);

      return data;
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteCategoria(id) {
    try {
      const res = await fetch(`${apiUrl}/categories/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      setCategorias((prev) =>
        prev.filter((categoria) => categoria.id !== data.id),
      );

      return data;
    } catch (err) {
      console.error(err);
    }
  }

  const ctxValue = {
    categorias,
    loading,
    addCategoria,
    deleteCategoria,
  };

  return (
    <CategoriasContext.Provider value={ctxValue}>
      {children}
    </CategoriasContext.Provider>
  );
}
