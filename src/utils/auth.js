import { redirect } from "react-router-dom";

export const requireAuth = () => {
  const storedExpiration = localStorage.getItem("expiration");
  if (!storedExpiration) {
    return redirect("/login");
  }
  const expirationDate = new Date(storedExpiration);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();

  if (duration < 0) {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    return redirect("/login");
  }
  const token = localStorage.getItem("token");
  if (!token) return redirect("/login");

  return null;
};
