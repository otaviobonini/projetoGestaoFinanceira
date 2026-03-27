import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import Skeleton from "../Skeleton";
import { MetasContext } from "../../store/metasContext";
export default function MetasContainer({ name, value, icon, color }) {
  const { loading } = useContext(MetasContext);
  return (
    <div className="bg-white shadow-sm rounded-lg flex gap-4 py-4 px-6 items-center  ml-2 h-24 ">
      <div className={`text-${color}-500`}>
        <label className={`text-xl bg-${color}-200 p-2 py-2 rounded-full`}>
          <FontAwesomeIcon icon={icon} />
        </label>
      </div>
      <div>
        <p className="uppercase text-gray-400 text-xs font-bold mb-[-4px]">
          {name}
        </p>
        <h1 className="font-bold text-xl">
          {loading ? <Skeleton className="h-4 mt-2"></Skeleton> : value}
        </h1>
      </div>
    </div>
  );
}
