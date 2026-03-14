import MainContent from "./components/MainContent";
import Sidebar from "./components/sidebar";
import TransactionProvider from "./store/transctionsContext";

function App() {
  return (
    <TransactionProvider>
      <div className="flex h-screen ">
        <Sidebar />
        <MainContent />
      </div>
    </TransactionProvider>
  );
}

export default App;
