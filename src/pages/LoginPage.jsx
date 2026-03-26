import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { TransactionContext } from "../store/transctionsContext";

export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const [success, setSucess] = useState(false);
  const [isSubmiting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useContext(TransactionContext);
  const apiUrl = import.meta.env.VITE_API_URL;

  async function onSubmit(data) {
    try {
      setIsSubmitting(true);
      setError(null);
      setSucess(false);
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (!response.ok) {
        console.log("erro:", res);
        setError(res.error);
        return;
      }
      console.log(res);
      localStorage.setItem("token", res.token);
      const expiration = new Date();
      expiration.setHours(expiration.getDate() + 7);
      localStorage.setItem("expiration", expiration.toISOString());
      setToken(res.token);

      setSucess(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Erro:", error.message);
      console.log(JSON.stringify(data));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <form
        className="min-w-fit  bg-white p-6 rounded-md shadow-md flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-center mb-4 font-bold  uppercase text-2xl">
          LOGIN
        </h1>
        <label htmlFor="email">Email</label>
        <input
          className="mb-3 p-2 rounded border"
          type="email"
          {...register("email")}
          placeholder="Insira seu email"
        />
        <label htmlFor="password">Password</label>
        <input
          className="mb-3 p-2 rounded border"
          type="password"
          {...register("password")}
          placeholder="Insira sua senha"
        />

        <button
          type="submit"
          disabled={isSubmiting}
          className="bg-green-400 rounded-md p-2 text-white mb-4"
        >
          {isSubmiting ? "Enviando" : "Entrar"}
        </button>
        <NavLink to={"/register"}>
          Não tem uma conta?{" "}
          <span className="text-blue-500 font-bold hover:cursor-pointer">
            Cadastre-se
          </span>
        </NavLink>
        {error && (
          <p className="text-red-500 mt-3 capitalize text-sm text-center">
            Erro: {error}
          </p>
        )}
        {success && (
          <p className="text-green-500 mt-3 capitalize text-sm text-center">
            Login feito com sucesso
          </p>
        )}
      </form>
    </div>
  );
}
