import { useContext } from "react";
import UltimasTransacoes from "../components/visaoGeral/UltimasTransacoes";
import NovoSaldo from "../components/transacoes/AdicionarSaldo";

import Skeleton from "../components/Skeleton";
import { TransactionContext } from "../store/transactionsContext";
import { MetasContext } from "../store/metasContext";

export default function TransacoesPage() {
  const { transacoes, loading } = useContext(TransactionContext);
  const { metas } = useContext(MetasContext);

  const entrada = transacoes
    .filter((t) => t.tipo === "entrada")
    .reduce((acc, t) => acc + Number(t.valor), 0);

  const saida = transacoes
    .filter((t) => t.tipo === "saida")
    .reduce((acc, t) => acc + Number(t.valor), 0);

  const metasGuardadas = metas
    .map((meta) => Number(meta.valorGuardado))
    .reduce((acc, value) => acc + value, 0);

  const saldo = entrada - saida - metasGuardadas;

  return (
    <div className="flex-1 h-full py-16 md:py-16 bg-gray-100 px-4 md:px-8">
      <h1 className="text-2xl md:text-4xl font-bold">Transações</h1>

      <div className="flex gap-4 flex-col mt-4">
        <p className="text-gray-700 text-sm md:text-lg">
          Adicione saldo e veja suas transações aqui.
        </p>

        <div className="bg-white p-4 w-full md:w-fit  shadow-sm rounded-lg flex flex-col sm:flex-row gap-4 sm:items-center">
          <div className="font-bold uppercase">
            <p className="text-xs text-gray-500">Saldo atual</p>
            {loading ? (
              <Skeleton className="align-middle w-20 mt-2"></Skeleton>
            ) : (
              <h1 className="text-lg md:text-xl">
                R$ {saldo.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </h1>
            )}
          </div>

          <NovoSaldo />
        </div>
      </div>

      <UltimasTransacoes />
    </div>
  );
}
