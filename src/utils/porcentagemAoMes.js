export default function calcularPorcentagemMes(transacoes, tipo) {
  const mesValores = {};

  const totalPositivo = transacoes
    .filter((t) => t.tipo === "entrada")
    .reduce((acc, t) => acc + Number(t.valor), 0);

  const totalNegativo = transacoes
    .filter((t) => t.tipo === "saida")
    .reduce((acc, t) => acc + Math.abs(Number(t.valor)), 0);

  transacoes.forEach((t) => {
    if (t.tipo === tipo) {
      const mes = new Date(t.createdAt).getMonth();
      if (!mesValores[mes]) mesValores[mes] = 0;
      mesValores[mes] += Number(t.valor);
    }
  });

  const dataAtual = new Date();
  const mesAtual = dataAtual.getMonth();
  const mesAnterior = mesAtual - 1 >= 0 ? mesAtual - 1 : 11;

  const atual = mesValores[mesAtual] || 0;
  const anterior = mesValores[mesAnterior] || 0;
  const economiaMensal = atual - anterior;

  let porcentagem = 0;
  if (anterior === 0) porcentagem = atual === 0 ? 0 : 100;
  else porcentagem = ((atual - anterior) / anterior) * 100;

  return {
    totalMes: atual,
    porcentagem: porcentagem.toFixed(2),
    economiaMensal,
    saldo: totalPositivo - totalNegativo,
  };
}
