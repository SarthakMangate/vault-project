import { useState, useEffect } from "react";
import { logout, currentUser } from "../utils/user";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(currentUser());
  }, []);

  function handleLogout() {
    logout();
    setUser(null);
    router.push("/login");
  }

  return (
    <header className="header">
      <h2>🔐 Secure Vault</h2>
      {user && (
        <div className="user-actions">
          <span>{user.email}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      <style jsx>{`
        .header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 24px;
          background: #1f1f1f;
          color: #fff;
          font-family: Arial, sans-serif;
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
          position: sticky;
          top: 0;
          z-index: 1000;
        }
        .user-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        button {
          padding: 6px 12px;
          border-radius: 8px;
          border: none;
          background: rgba(255,255,255,0.2);
          color: #fff;
          cursor: pointer;
          font-weight: bold;
          transition: all 0.3s ease;
        }
        button:hover {
          background: #fff;
          color: #764ba2;
        }
      `}</style>
    </header>
  );
}
