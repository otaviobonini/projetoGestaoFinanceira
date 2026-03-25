import MetasContainer from "./MetasContainer";
import NovaMeta from "./NovaMeta";
import CustomMetasContainer from "./CustomMetasContainers";
import { TransactionContext } from "../../store/transctionsContext";

import {
  faPiggyBank,
  faCircleCheck,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import Loading from "../Loading";

export default function Metas() {
  const { metas, loading } = useContext(TransactionContext);

  const metasConcluidas = metas.filter(
    (meta) => Number(meta.valorGuardado) >= Number(meta.objetivo),
  );
  const metasAndamento = metas.filter(
    (meta) => Number(meta.valorGuardado) < Number(meta.objetivo),
  );

  const valorTotal = metas
    .map((meta) => Number(meta.valorGuardado))
    .reduce((acc, curr) => acc + curr, 0);
  const metasData = [
    {
      name: "Total Guardado",
      value: `R$ ${valorTotal.toLocaleString("pt-BR")}`,
      icon: faPiggyBank,
      color: "green",
    },
    {
      name: "Metas Concluídas",
      value: metasConcluidas.length,
      icon: faCircleCheck,
      color: "green",
    },
    {
      name: "Metas em andamento",
      value: metasAndamento.length,
      icon: faFlag,
      color: "red",
    },
  ];
  return (
    <div className="bg-gray-100 w-full min-h-screen py-16 px-4 md:px-8">
      <h1 className="text-2xl font-bold">Minhas Metas</h1>
      <p className="text-gray-600">
        Acompanhe seus objetivos e realize seus sonhos.
      </p>

      <div className="grid  w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-6">
        {metasData.map((meta) => (
          <MetasContainer
            key={meta.name}
            icon={meta.icon}
            name={meta.name}
            value={meta.value}
            color={meta.color}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <Loading />
        ) : (
          metas.map((meta) => (
            <CustomMetasContainer
              key={meta.id}
              nome={meta.nome}
              desc={meta.descMeta}
              obj={meta.objetivo}
              data={meta.dataConclusao}
              metaId={meta.id}
              valor={meta.valorGuardado}
            />
          ))
        )}

        <NovaMeta />
      </div>
    </div>
  );
}
