import { createContext, useState } from "react";

export const AuthContext = createContext({
  getAuthToken: () => {},
  login: () => {},
  token: [],
  logout: () => {},
});

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  function getAuthToken() {
    return localStorage.getItem("token");
  }
  function login(token) {
    localStorage.setItem("token", token);
    const expiration = new Date();
    expiration.setDate(expiration.getDate() + 7);
    localStorage.setItem("expiration", expiration.toISOString());
    setToken(token);
  }
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    setToken(null);
  }

  const ctxValue = {
    getAuthToken,
    token,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
  );
}
