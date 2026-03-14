import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faCheckCircle,
  faArrowTrendUp,
} from "@fortawesome/free-solid-svg-icons";
import AdicionarValorMeta from "./AdicionarValorMeta";

export default function CustomMetasContainer({
  nome,
  desc,
  obj,
  data,
  metaId,
  valor,
}) {
  const dataObj = new Date(data);

  const formatedData = dataObj.toLocaleDateString("pt-BR", {
    month: "short",
    year: "2-digit",
  });

  const percent = (valor / obj) * 100;

  let barColor = "";
  let textColor = "";

  if (percent < 50) {
    barColor = "bg-red-500";
    textColor = "text-red-500";
  } else if (percent < 80) {
    barColor = "bg-yellow-500";
    textColor = "text-yellow-500";
  } else {
    barColor = "bg-green-500";
    textColor = "text-green-500";
  }

  return (
    <div className="bg-white w-9/12 p-4 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold ">
        {nome}
        {percent >= 100 ? (
          <>
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-green-500 ml-2"
            />
          </>
        ) : (
          <>
            <FontAwesomeIcon
              className="text-blue-500 ml-4"
              icon={faArrowTrendUp}
            />
          </>
        )}
      </h1>
      <p className="mb-8">{desc}</p>
      <p className="text-sm font-bold text-gray-400">GUARDADO</p>
      <h2 className="font-bold text-2xl ">
        {Number(valor).toLocaleString("pt-BR")}R${" "}
        <span className="font-normal text-sm text-gray-500">
          / R${Number(obj).toLocaleString("pt-BR")}
        </span>
        <p className={`font-bold text-right ${textColor}`}>
          {Math.round(percent)}%
        </p>
      </h2>

      {/* Barra de progresso */}
      <div>
        <div className="bg-gray-300  rounded-full mb-2 mt-2 overflow-hidden">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${barColor}`}
            style={{ width: `${percent}%` }}
          ></div>
        </div>
      </div>

      <div className="flex gap-4">
        <p className="text-gray-600 text-sm font-bold">
          <FontAwesomeIcon icon={faCalendarDays} /> Previsto: {formatedData}
        </p>
        <AdicionarValorMeta metaId={metaId}></AdicionarValorMeta>
      </div>
    </div>
  );
}
