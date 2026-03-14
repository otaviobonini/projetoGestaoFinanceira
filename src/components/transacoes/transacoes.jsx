import { useContext } from "react";
import { TransactionContext } from "../../store/transctionsContext";
import UltimasTransacoes from "../visaoGeral/UltimasTransacoes";
import NovoSaldo from "./adicionarSaldo";

export default function Transacoes() {
  const { saldo } = useContext(TransactionContext);
  return (
    <div className="flex-1 ml-24 h-full py-16 bg-gray-100 px-8">
      <h1 className="text-4xl font-bold">Transações</h1>
      <div className="flex space-x-80">
        <p className="text-gray-700 text-lg ">
          Adicione saldo e veja suas transações aqui.
        </p>
        <div className="bg-white p-4 shadow-sm rounded-lg flex gap-4 ">
          <div className="font-bold uppercase">
            <p className="text-xs text-gray-500">Saldo atual</p>
            <h1 className="text-xl">R$ {saldo.toLocaleString("pt-BR")} </h1>
          </div>

          <NovoSaldo></NovoSaldo>
        </div>
      </div>{" "}
      <UltimasTransacoes></UltimasTransacoes>
    </div>
  );
}
