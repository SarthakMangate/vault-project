import { useState, useEffect } from "react";

export default function PasswordGenerator({ onGenerate }) {
  const [length, setLength] = useState(12);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(true);
  const [generated, setGenerated] = useState("");
  const [copied, setCopied] = useState(false);

  const similarChars = "Il1O0";
  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()-_=+[]{};:,.<>?";

  function generatePassword() {
    let chars = letters;
    if (useNumbers) chars += numbers;
    if (useSymbols) chars += symbols;
    if (excludeSimilar)
      chars = chars.split("").filter((c) => !similarChars.includes(c)).join("");

    let pwd = "";
    for (let i = 0; i < length; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGenerated(pwd);
    onGenerate(pwd);

    // Copy to clipboard safely
    navigator.clipboard.writeText(pwd).then(() => {
      setCopied(true);
    });
  }

  function clearClipboard() {
    navigator.clipboard.writeText("").then(() => setCopied(false));
  }

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 15000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <div className="glass-card">
      <h3>🔐 Generate a Strong Password</h3>

      <label>
        Length: <strong>{length}</strong>
        <input
          type="range"
          min="6"
          max="32"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
        />
      </label>

      <div className="options">
        <label>
          <input
            type="checkbox"
            checked={useNumbers}
            onChange={(e) => setUseNumbers(e.target.checked)}
          />{" "}
          Numbers
        </label>
        <label>
          <input
            type="checkbox"
            checked={useSymbols}
            onChange={(e) => setUseSymbols(e.target.checked)}
          />{" "}
          Symbols
        </label>
        <label>
          <input
            type="checkbox"
            checked={excludeSimilar}
            onChange={(e) => setExcludeSimilar(e.target.checked)}
          />{" "}
          Exclude look-alikes
        </label>
      </div>

      {/* Glassmorphic Generate Button */}
      <button className="btn generate-btn" onClick={generatePassword}>
        Generate Password
      </button>

      {generated && (
        <div style={{ marginTop: "15px" }}>
          <input
            readOnly
            className="input"
            value={generated}
            onClick={(e) => e.target.select()}
          />
          <button className="btn small mt-2" onClick={clearClipboard}>
            Clear Clipboard
          </button>
          {copied && <div style={{ marginTop: "8px" }}>✅ Password copied!</div>}
        </div>
      )}

      <style jsx>{`
        .glass-card {
          background: linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.1),
              rgba(255, 255, 255, 0.05)
            );
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 30px;
          width: 350px;
          color: #fff;
          margin: 30px auto;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.2);
          text-align: center;
        }

        h3 {
          margin-bottom: 20px;
          font-size: 1.5rem;
          background: linear-gradient(90deg, #764ba2, #667eea);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        label {
          display: block;
          margin-bottom: 15px;
          font-size: 0.95rem;
        }

        input[type="range"] {
          width: 100%;
          margin-top: 6px;
        }

        .options label {
          display: inline-block;
          margin: 6px 12px 0 0;
          font-size: 0.9rem;
          cursor: pointer;
        }

        .btn {
          border-radius: 12px;
          border: none;
          color: #fff;
          font-weight: bold;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .btn.small {
          width: auto;
          padding: 8px 14px;
          font-size: 0.85rem;
          margin-top: 8px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.25);
        }

        .generate-btn {
          width: 100%;
          padding: 14px;
          margin-top: 18px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.25);
          font-weight: 700;
          font-size: 1.05rem;
        }

        .generate-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35);
        }

        .generate-btn:active {
          transform: translateY(0px) scale(0.98);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.25);
        }

        .input {
          width: 100%;
          margin-top: 18px;
          padding: 12px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          font-weight: bold;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .input:focus {
          outline: none;
          border: 1px solid #fff;
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
