// basicamente eu tenho q pegar as transacoes e filtrar por mes, tipo = 'saida' dai eu verifico se ela ja esta no array de gastos
// , se ela estiver eu somo o valor dela ao valor acumulado e se ela nao estiver eu inlcuo essa categoria no array junto com o valor

import { useMemo } from "react";

export function useGastosPorCategoria(transacoes) {
  return useMemo(() => {
    const mes = new Date().getMonth();
    const gastos = {};
    const filtradas = transacoes.filter(
      (t) => t.tipo === "saida" && new Date(t.createdAt).getMonth() === mes,
    );
    filtradas.forEach((f) => {
      if (f.categoriaId in gastos) {
        gastos[f.categoriaId] += Math.abs(f.valor);
      } else {
        gastos[f.categoriaId] = Math.abs(f.valor);
      }
    });

    return gastos;
  }, [transacoes]);
}
