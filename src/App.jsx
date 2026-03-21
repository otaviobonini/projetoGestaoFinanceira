import Sidebar from "./components/sidebar";
import TransactionProvider from "./store/transctionsContext";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index";

function App() {
  return (
    <TransactionProvider>
      <RouterProvider router={router}></RouterProvider>
    </TransactionProvider>
  );
}

export default App;
