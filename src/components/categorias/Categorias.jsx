import CategoriasContainers from "./CategoriasContainers";
import NovaCategoria from "./NovaCategoria";
import { useContext } from "react";
import { TransactionContext } from "../../store/transctionsContext";
import VisaoGastosTotais from "./VisaoGastosTotais";

export default function Categorias() {
  const { categorias, transacoes } = useContext(TransactionContext);
  return (
    <div className="flex-1 ml-24 h-full py-16 bg-gray-100 px-8">
      <h1 className="text-4xl font-bold">Categorias</h1>
      <div className="flex space-x-80">
        <p className="text-gray-700 text-lg ">
          Gerencie suas categorias de gastos e o seu orçamento mensal
        </p>
      </div>
      <VisaoGastosTotais></VisaoGastosTotais>
      <div className="grid grid-cols-3 gap-y-12 py-8  ">
        {categorias.map((categoria) => {
          const gasto = transacoes
            .filter((t) => t.categoria === categoria.nome && t.tipo === "saida")
            .reduce((acc, t) => acc + Math.abs(t.valor), 0);

          return (
            <>
              <CategoriasContainers
                key={categoria.id}
                nomeCategoria={categoria.nome}
                orcamento={categoria.orcamento}
                gasto={gasto}
              />
            </>
          );
        })}
        <NovaCategoria></NovaCategoria>
      </div>
    </div>
  );
}
