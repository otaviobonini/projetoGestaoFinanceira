import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../store/authContext";

export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const [success, setSucess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
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
      login(res.token);
      setSucess(true);

      navigate("/");
    } catch (error) {
      console.error("Erro:", error.message);
      console.log(JSON.stringify(data));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white-100 flex items-center justify-center">
      <div className="w-full  rounded-2xl  overflow-hidden flex">
        <div
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1554224155-6726b3ff858f')",
            backgroundSize: "cover",
          }}
          className="w-1/2 h-screen hidden sm:inline "
        ></div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto w-3/8 flex flex-col justify-center  p-16"
        >
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold mb-6">Bem-vindo de volta!</h1>
            <p className="text-2xl">
              Faça seu login com uma conta existente para continuar.
            </p>
          </div>
          <div className="relative mb-6">
            <input
              id="email"
              type="email"
              {...register("email", { required: true })}
              placeholder=" "
              className="peer w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 focus:shadow-md"
            />

            <label
              htmlFor="email"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white px-1 text-gray-500 transition-all duration-150
    peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base
    peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-sm peer-focus:text-blue-600
    peer-valid:top-0 peer-valid:-translate-y-1/2 peer-valid:text-sm"
            >
              Email
            </label>
          </div>

          <div className="relative mb-8">
            <input
              id="password"
              type="password"
              {...register("password", { required: true })}
              placeholder=" "
              className="peer w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 focus:shadow-md"
            />

            <label
              htmlFor="password"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white px-1 text-gray-500 transition-all duration-150
    peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base
    peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-sm peer-focus:text-blue-600
    peer-valid:top-0 peer-valid:-translate-y-1/2 peer-valid:text-sm"
            >
              Senha
            </label>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-500 hover:bg-green-600 transition text-white rounded-xl p-4 font-semibold"
          >
            {isSubmitting ? "Enviando..." : "Entrar"}
          </button>

          <NavLink to="/register" className="mt-6 text-center">
            Não tem uma conta?{" "}
            <span className="text-blue-600 font-semibold hover:underline">
              Cadastre-se
            </span>
          </NavLink>

          {error && (
            <p className="text-red-500 mt-5 text-center">Erro: {error}</p>
          )}

          {success && (
            <p className="text-green-500 mt-5 text-center">
              Login feito com sucesso!
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
