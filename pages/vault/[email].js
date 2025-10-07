import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import VaultList from "../../components/VaultList";
import PasswordGenerator from "../../components/PasswordGenerator";

export default function VaultPage() {
  const router = useRouter();
  const { email } = router.query;

  const [vaultItems, setVaultItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch vault items when email is available
  useEffect(() => {
    if (!email) return;

    async function fetchVault() {
      try {
        const res = await fetch(`/api/vault?email=${email}`);
        if (!res.ok) throw new Error("Failed to fetch vault");
        const data = await res.json();
        setVaultItems(data.vaultItems || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchVault();
  }, [email]);

  // Save vault items to MongoDB
  async function handleSave(updated) {
    setVaultItems(updated);

    try {
      await fetch(`/api/vault?email=${email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vaultItems: updated }),
      });
    } catch (err) {
      console.error("Failed to save vault:", err);
    }
  }

  if (loading) return <div>Loading vault...</div>;

  return (
    <div className="container mt-4">

      {/* Password Generator */}
      <div className="mb-4">
        <PasswordGenerator
          onGenerate={(pwd) => {
            // Auto copy generated password to clipboard
            navigator.clipboard.writeText(pwd).catch(() => {});
            alert(`Generated password copied to clipboard: ${pwd}`);
          }}
        />
      </div>

      {/* Vault List / Add Item Form */}
      <VaultList vaultItems={vaultItems} onSave={handleSave} />

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 40px 20px;
          background: #121212;
          font-family: Arial, sans-serif;
        }
      `}</style>
    </div>
  );
}
