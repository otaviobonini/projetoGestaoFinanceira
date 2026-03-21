export function variaveisGrafico(transacoes) {
  const categorias = {};

  transacoes.map((t) => {
    if (t.tipo === "saida") {
      if (!categorias[t.categoria.nome]) categorias[t.categoria.nome] = 0;
      categorias[t.categoria.nome] += Math.abs(t.valor);
    }
  });

  const labels = Object.keys(categorias);
  console.log(categorias);
  const values = Object.values(categorias);

  const totalGastos = values.reduce((a, b) => a + b, 0);

  const porcentagens = values.map((v) =>
    totalGastos > 0 ? ((v / totalGastos) * 100).toFixed(1) + "%" : "0%",
  );

  const colors = ["#ef4444", "#fbbf24", "#34d399", "#3b82f6", "#8b5cf6"];

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors.slice(0, labels.length),
        borderColor: colors.slice(0, labels.length).map((c) => c + "CC"),
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  return {
    data,
    labels,
    porcentagens,
    totalGastos,
    colors,
  };
}
