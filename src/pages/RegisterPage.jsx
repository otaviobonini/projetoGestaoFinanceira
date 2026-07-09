import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const [success, setSucess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      setIsSubmitting(true);
      setError(null);
      setSucess(false);

      const response = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await response.json();

      if (!response.ok) {
        setError(res.error);
        return;
      }

      setSucess(true);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full overflow-hidden flex">
        <div
          className="hidden md:block w-1/2 h-screen bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1554224155-6726b3ff858f')",
          }}
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto flex flex-col justify-center p-16 w-full max-w-lg"
        >
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold mb-6">Crie sua conta</h1>
            <p className="text-2xl">Preencha os dados abaixo para começar.</p>
          </div>

          {/* Nome */}
          <div className="relative mb-6">
            <input
              id="name"
              type="text"
              {...register("name", { required: true })}
              placeholder=" "
              className="peer w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 focus:shadow-md"
            />

            <label
              htmlFor="name"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white px-1 text-gray-500 transition-all duration-150
              peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base
              peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-sm peer-focus:text-blue-600
              peer-valid:top-0 peer-valid:-translate-y-1/2 peer-valid:text-sm"
            >
              Nome
            </label>
          </div>

          {/* Email */}
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

          {/* Senha */}
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
            className="rounded-xl bg-green-500 p-4 font-semibold text-white transition hover:bg-green-600"
          >
            {isSubmitting ? "Registrando..." : "Criar conta"}
          </button>

          <NavLink to="/login" className="mt-6 text-center">
            Já possui uma conta?{" "}
            <span className="font-semibold text-blue-600 hover:underline">
              Entrar
            </span>
          </NavLink>

          {error && (
            <p className="mt-5 text-center text-red-500">Erro: {error}</p>
          )}

          {success && (
            <p className="mt-5 text-center text-green-500">
              Registro realizado com sucesso!
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
