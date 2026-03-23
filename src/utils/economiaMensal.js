export default function calcularEconomiaMensal(transacoes) {
  const dataAtual = new Date();
  const mesAtual = dataAtual.getMonth();
  const mesPassado = mesAtual === 0 ? 11 : mesAtual - 1;

  function calcularSaldoMes(mes) {
    let entradas = 0;
    let saidas = 0;

    transacoes.forEach((t) => {
      const mesTransacao = new Date(t.createdAt).getMonth();

      if (mesTransacao === mes) {
        const valor = Number(t.valor);

        if (t.tipo === "entrada") {
          entradas += valor;
        } else {
          saidas += Math.abs(valor);
        }
      }
    });

    return entradas - saidas;
  }

  const saldoMesAtual = calcularSaldoMes(mesAtual);
  const saldoMesPassado = calcularSaldoMes(mesPassado);

  return {
    economiaAtual: saldoMesAtual,
    variacao: saldoMesAtual - saldoMesPassado,
    semDadosAnterior: saldoMesPassado === 0,
  };
}
