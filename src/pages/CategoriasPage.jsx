import CategoriasContainers from "../components/categorias/CategoriasContainers";
import NovaCategoria from "../components/categorias/NovaCategoria";
import { useTransacoes } from "../hooks/useTransacoes";
import VisaoGastosTotais from "../components/categorias/VisaoGastosTotais";
import { useGastosPorCategoria } from "../hooks/useGastosPorCategoria";
import { useCategorias } from "../hooks/useCategorias";

export default function CategoriasPage() {
  const { transacoes } = useTransacoes();
  const { categorias, addCategoria, deleteCategoria } = useCategorias();
  const gastosPorCategoria = useGastosPorCategoria(transacoes);

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
          const gasto = gastosPorCategoria[categoria.id] || 0;
          return (
            <CategoriasContainers
              key={categoria.id}
              id={categoria.id}
              nomeCategoria={categoria.nome}
              orcamento={categoria.orcamento}
              gasto={gasto}
              deleteCategoria={deleteCategoria}
            />
          );
        })}
        <NovaCategoria addCategoria={addCategoria}></NovaCategoria>
      </div>
    </div>
  );
}
