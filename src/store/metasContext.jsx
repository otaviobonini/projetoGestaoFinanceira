import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./authContext";

export const MetasContext = createContext({
  metas: [],
  loading: true,
  addMeta: () => {},
  addValorMeta: () => {},
  removeValorMeta: () => {},
  deleteMeta: () => {},
});

export default function MetasProvider({ children }) {
  const [metas, setMetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);
  const apiUrl = import.meta.env.VITE_API_URL;

  async function fetchMetas() {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${apiUrl}/metas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setMetas(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMetas();
  }, [token]);

  async function addMeta(nome, desc, obj, data) {
    if (nome === undefined || obj <= 0) return;

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
      return responseData;
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteMeta(id) {
    try {
      const deletedMeta = await fetch(`${apiUrl}/metas/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const deleteData = await deletedMeta.json();

      setMetas((prev) => prev.filter((meta) => meta.id !== deleteData.id));

      return deleteData;
    } catch (err) {
      console.log(err);
    }
  }
  async function removeValorMeta(valor, id) {
    if (!valor || valor <= 0) return;

    const valorNumerico = Number(valor);

    try {
      const newMetaValue = await fetch(`${apiUrl}/metas/remove-value/${id}`, {
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
            ? {
                ...meta,
                valorGuardado: Number(meta.valorGuardado) - valorNumerico,
              }
            : meta,
        ),
      );

      return res;
    } catch (err) {
      console.error(err);
    }
  }

  async function addValorMeta(valor, id) {
    if (!valor || valor <= 0) return;

    const valorNumerico = Number(valor);

    try {
      const newMetaValue = await fetch(`${apiUrl}/metas/add-value/${id}`, {
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
            ? {
                ...meta,
                valorGuardado: Number(meta.valorGuardado) + valorNumerico,
              }
            : meta,
        ),
      );

      return res;
    } catch (err) {
      console.error(err);
    }
  }

  const ctxValue = {
    metas,
    loading,
    addMeta,
    deleteMeta,
    addValorMeta,
    removeValorMeta,
  };

  return (
    <MetasContext.Provider value={ctxValue}>{children}</MetasContext.Provider>
  );
}
