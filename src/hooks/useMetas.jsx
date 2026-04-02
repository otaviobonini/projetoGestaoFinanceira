import { useCallback, useContext } from "react";
import {
  addMeta as addMetaService,
  removeValorMeta as removeValorMetaService,
  addValorMeta as addValorMetaService,
  deleteMeta as deleteMetaService,
  fetchMetas as fetchMetasService,
} from "../services/metaService";
import { AuthContext } from "../store/authContext";
import { MetasContext } from "../store/metasContext";

export function useMetas() {
  const { token } = useContext(AuthContext);
  const { metas, loading, setMetas, setLoading } = useContext(MetasContext);

  // FUNÇÃO FETCH METAS
  const fetchMetas = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchMetasService(token);
      setMetas(data);
    } catch (error) {
      console.error("Erro ao buscar metas:", error);
    } finally {
      setLoading(false);
    }
  }, [token, setMetas, setLoading]);

  // DELETANDO META
  const deleteMeta = useCallback(
    async (id) => {
      try {
        const data = await deleteMetaService(token, id);
        setMetas((prev) => prev.filter((meta) => meta.id !== data.id));
      } catch (error) {
        console.error("Erro as deletar meta:", error);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setMetas, token],
  );

  const addMeta = useCallback(
    async ({ nome, desc, obj, data }) => {
      try {
        const res = await addMetaService(token, nome, desc, obj, data);
        setMetas((prevMetas) => [...prevMetas, res]);
        return res;
      } catch (error) {
        console.error("Falha ao crirar meta:", error);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setMetas, token],
  );
  const removeValorMeta = useCallback(
    async ({ id, valor }) => {
      try {
        const data = await removeValorMetaService(token, id, valor);

        setMetas((prevMetas) =>
          prevMetas.map((meta) =>
            meta.id === data.id
              ? {
                  ...meta,
                  valorGuardado: Number(meta.valorGuardado) - valor,
                }
              : meta,
          ),
        );
        return data;
      } catch (error) {
        console.error("Falha ao remover valor da meta:", error);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setMetas, token],
  );

  const addValorMeta = useCallback(
    async ({ id, valor }) => {
      try {
        const data = await addValorMetaService(token, id, valor);
        setMetas((prevMetas) =>
          prevMetas.map((meta) =>
            meta.id === data.id
              ? {
                  ...meta,
                  valorGuardado: Number(meta.valorGuardado) + Number(valor),
                }
              : meta,
          ),
        );

        return data;
      } catch (error) {
        console.error("Erro ao adicionar valor meta:", error);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setMetas, token],
  );

  return {
    removeValorMeta,
    addMeta,
    addValorMeta,
    deleteMeta,
    metas,
    loading,
    fetchMetas,
  };
}
