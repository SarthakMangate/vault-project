import { useState, useEffect } from "react";
import { signup } from "../utils/user";
import { useRouter } from "next/router";

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true); // trigger entrance animation
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await signup(email, password);
      setMessage("Signup successful! Redirecting...");
      setTimeout(() => router.push("/login"), 1500);
    } catch (err) {
      setMessage(err.message);
    }
  }

  return (
    <div className="container">
      <div className={`glass-card ${animate ? "animate" : ""}`}>
        <h2 className="title">Welcome to Your Vault</h2>
        <p className="subtitle">Create your account to get started</p>
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
          <button type="submit" className="btn">Create Account</button>
        </form>
        {message && <p className="message">{message}</p>}
        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #667eea, #764ba2);
          font-family: 'Arial', sans-serif;
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
          transform: translateY(50px);
          opacity: 0;
          transition: all 0.6s ease-out;
        }

        .glass-card.animate {
          transform: translateY(0);
          opacity: 1;
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

        .message {
          margin-top: 12px;
          font-size: 0.85rem;
          color: #ffe0e0;
        }

        .login-link {
          margin-top: 16px;
          font-size: 0.85rem;
          color: #f0f0f0;
        }

        .login-link a {
          color: #ffffff;
          font-weight: bold;
          text-decoration: underline;
          transition: color 0.3s ease;
        }

        .login-link a:hover {
          color: #ffd700;
        }
      `}</style>
    </div>
  );
}
