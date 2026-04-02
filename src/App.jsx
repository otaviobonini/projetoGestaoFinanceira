import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index";
import AppProvider from "./store/appContext";
import InitialDataLoader from "./components/DataLoader";

function App() {
  return (
    <AppProvider>
      <InitialDataLoader>
        <RouterProvider router={router}></RouterProvider>
      </InitialDataLoader>
    </AppProvider>
  );
}

export default App;
