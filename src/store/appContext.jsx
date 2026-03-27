import AuthProvider from "./authContext";
import CategoriasProvider from "./categoriasContext";
import MetasProvider from "./metasContext";
import TransactionProvider from "./transactionsContext";

export default function AppProvider({ children }) {
  return (
    <AuthProvider>
      <CategoriasProvider>
        <MetasProvider>
          <TransactionProvider>{children}</TransactionProvider>
        </MetasProvider>
      </CategoriasProvider>
    </AuthProvider>
  );
}
