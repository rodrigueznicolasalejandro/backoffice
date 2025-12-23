import React, { useState, FormEvent } from "react";
// Update the import path below to the correct relative path if the file exists elsewhere
import { HttpAuthRepository } from "../../../infrastructure/http/repositories/auth.adapter";
import { LoginUseCase } from "@application/usecases/login.usecase";

const authRepository = new HttpAuthRepository();
const loginUseCase = new LoginUseCase(authRepository);

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { user, token } = await loginUseCase.execute(username, password);

      // Save to localStorage
      localStorage.setItem("jwt_token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Navigate to dashboard
      window.location.href = "/bo/products";
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#667eea] to-[#764ba2] p-5 font-sans antialiased">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <img src="/public/assets/logo/logo.png" alt="Logo" className="w-20 h-20 object-cover rounded-full" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 m-0">Backoffice Dashboard</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {error && <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm">{error}</div>}

          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-sm font-medium text-gray-600">
              Usuario <span className="text-red-600">*</span>
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg text-sm transition-all focus:outline-none focus:border-[#5FE9D0] focus:ring-4 focus:ring-[#5FE9D0]/10"
              placeholder="Ingrese su usuario"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-600">
              Contraseña <span className="text-red-600">*</span>
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg text-sm transition-all focus:outline-none focus:border-[#5FE9D0] focus:ring-4 focus:ring-[#5FE9D0]/10"
              placeholder="Ingrese su contraseña"
              required
            />
          </div>

          <button 
            type="submit" 
            className="bg-gradient-to-br from-[#5FE9D0] to-[#3CDDC0] text-white border-none px-6 py-3.5 rounded-lg text-base font-semibold cursor-pointer transition-all mt-2 hover:enabled:-translate-y-0.5 hover:enabled:shadow-[0_8px_16px_rgba(95,233,208,0.3)] disabled:opacity-60 disabled:cursor-not-allowed" 
            disabled={loading}
          >
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200 text-center text-[13px] text-gray-600">
          <p>Usuarios de prueba:</p>
          <ul className="list-none p-0 mt-2">
            <li className="my-1 font-mono">admin / admin123</li>
            <li className="my-1 font-mono">user / user123</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
