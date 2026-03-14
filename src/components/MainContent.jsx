import Dashboard from "./visaoGeral/Dashboard";
import Categorias from "./categorias/Categorias";
import Metas from "./metas/Metas";
import { useContext } from "react";
import { TransactionContext } from "../store/transctionsContext";
import Transacoes from "../components/transacoes/transacoes";

export default function MainContent() {
  const { activeButton } = useContext(TransactionContext);
  if (activeButton === "Visão Geral") {
    return <Dashboard />;
  }
  if (activeButton === "Categorias") {
    return <Categorias />;
  }
  if (activeButton === "Metas") {
    return <Metas />;
  }
  if (activeButton === "Transacoes") {
    return <Transacoes />;
  }
}
