import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index";
import AppProvider from "./store/appContext";

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router}></RouterProvider>
    </AppProvider>
  );
}

export default App;
