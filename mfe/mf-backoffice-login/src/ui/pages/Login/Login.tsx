import React, { useState, FormEvent } from "react";
// Update the import path below to the correct relative path if the file exists elsewhere
import { HttpAuthRepository } from "../../../infrastructure/http/repositories/auth.adapter";
import { LoginUseCase } from "@application/usecases/login.usecase";
import "./Login.css";

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
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">L</div>
          <h1 className="login-title">Backoffice Dashboard</h1>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="login-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="username">
              Usuario <span className="required">*</span>
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
              placeholder="Ingrese su usuario"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Contraseña <span className="required">*</span>
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Ingrese su contraseña"
              required
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </form>

        <div className="login-footer">
          <p>Usuarios de prueba:</p>
          <ul>
            <li>admin / admin123</li>
            <li>user / user123</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
