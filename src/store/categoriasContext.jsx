import { createContext, useState } from "react";

export const CategoriasContext = createContext({
  categorias: [],
  setCategorias: () => {},
  loading: true,
  setLoading: () => {},
});

export default function CategoriasProvider({ children }) {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  const ctxValue = { categorias, setCategorias, loading, setLoading };

  return (
    <CategoriasContext.Provider value={ctxValue}>
      {children}
    </CategoriasContext.Provider>
  );
}
