import { createContext, useState } from "react";

export const MetasContext = createContext({
  metas: [],
  loading: true,
  setMetas: () => {},
  setLoading: () => {},
});

export default function MetasProvider({ children }) {
  const [metas, setMetas] = useState([]);
  const [loading, setLoading] = useState(true);

  const ctxValue = {
    metas,
    loading,
    setMetas,
    setLoading,
  };

  return (
    <MetasContext.Provider value={ctxValue}>{children}</MetasContext.Provider>
  );
}
