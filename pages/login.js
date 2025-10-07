import { useState } from "react";
import { login } from "../utils/user";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(email, password);
      router.push(`/vault/${email}`);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="container">
      <div className="glass-card">
        <h2 className="title">Welcome Back</h2>
        <p className="subtitle">Login to access your vault</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn">Login</button>
        </form>
        {error && <p className="error">{error}</p>}
        <p className="signup-text">
          Don’t have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>

      <style jsx>{`
        body, html, .container {
          margin: 0;
          padding: 0;
          height: 100%;
          font-family: 'Arial', sans-serif;
        }

        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #667eea, #764ba2);
          min-height: 100vh;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border-radius: 20px;
          padding: 40px 30px;
          width: 360px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
          text-align: center;
          color: #fff;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .glass-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
        }

        .title {
          margin-bottom: 8px;
          font-size: 2rem;
          font-weight: bold;
        }

        .subtitle {
          margin-bottom: 24px;
          font-size: 0.95rem;
          color: #e0e0e0;
        }

        .input {
          width: 100%;
          padding: 12px 15px;
          margin-bottom: 16px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          font-size: 0.95rem;
          transition: background 0.3s ease, border 0.3s ease;
        }

        .input::placeholder {
          color: #f0f0f0;
        }

        .input:focus {
          background: rgba(255, 255, 255, 0.25);
          border: 1px solid #ffffff;
          outline: none;
        }

        .btn {
          width: 100%;
          padding: 12px 0;
          border: none;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.25);
          color: #fff;
          font-weight: bold;
          cursor: pointer;
          font-size: 1rem;
          transition: background 0.3s ease, color 0.3s ease;
        }

        .btn:hover {
          background: #ffffff;
          color: #764ba2;
        }

        .error {
          margin-top: 12px;
          font-size: 0.85rem;
          color: #ff6b6b;
        }

        .signup-text {
          margin-top: 16px;
          font-size: 0.85rem;
          color: #f0f0f0;
        }

        .signup-text a {
          color: #ffffff;
          font-weight: bold;
          text-decoration: underline;
          transition: color 0.3s ease;
        }

        .signup-text a:hover {
          color: #ffd700;
        }
      `}</style>
    </div>
  );
}
