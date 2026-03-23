import CategoriasContainers from "./CategoriasContainers";
import NovaCategoria from "./NovaCategoria";
import { useContext } from "react";
import { TransactionContext } from "../../store/transctionsContext";
import VisaoGastosTotais from "./VisaoGastosTotais";

export default function Categorias() {
  const { categorias, transacoes } = useContext(TransactionContext);
  return (
    <div className="  h-full py-16 bg-gray-100 px-8">
      <h1 className="text-2xl font-bold">Categorias</h1>
      <div className=" space-x-80">
        <p className="text-gray-700 text-lg ">
          Gerencie suas categorias de gastos e o seu orçamento mensal
        </p>
      </div>
      <VisaoGastosTotais></VisaoGastosTotais>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 py-8  ">
        {categorias.map((categoria) => {
          const mes = new Date().getMonth();
          const gasto = transacoes
            .filter(
              (t) =>
                t.categoriaId === categoria.id &&
                t.tipo === "saida" &&
                new Date(t.createdAt).getMonth() === mes,
            )
            .reduce((acc, t) => acc + Math.abs(t.valor), 0);

          return (
            <>
              <CategoriasContainers
                key={categoria.id}
                id={categoria.id}
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
