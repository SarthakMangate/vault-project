import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import PasswordGenerator from "../../components/PasswordGenerator";
import VaultList from "../../components/VaultList";
import { getVaultForUser, saveVaultForUser } from "../../lib/storage";

export default function VaultPage() {
  const user = useAuth();
  const [vault, setVault] = useState([]);

  useEffect(() => {
    if (user) {
      const stored = getVaultForUser(user.email);
      setVault(stored);
    }
  }, [user]);

  function handleSave(updated) {
    setVault(updated);
    saveVaultForUser(user.email, updated);
  }

  function handleGenerated(pwd) {
    navigator.clipboard.writeText(pwd);
  }

  if (!user) return <p>Loading...</p>;

  return (
    <>
      <PasswordGenerator onGenerate={handleGenerated} />
      <VaultList vaultItems={vault} onSave={handleSave} />
    </>
  );
}
