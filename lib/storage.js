const USERS_KEY = "sv_users_v1";
const VAULT_KEY = (email) => `sv_vault_${email}`;

export function saveUserRecord(email, record) {
  const raw = localStorage.getItem(USERS_KEY);
  const obj = raw ? JSON.parse(raw) : {};
  obj[email] = record;
  localStorage.setItem(USERS_KEY, JSON.stringify(obj));
}

export function getUserRecord(email) {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) return null;
  const obj = JSON.parse(raw);
  return obj[email] ?? null;
}

export function saveVaultForUser(email, encryptedItems) {
  localStorage.setItem(VAULT_KEY(email), JSON.stringify(encryptedItems));
}

export function getVaultForUser(email) {
  const raw = localStorage.getItem(VAULT_KEY(email));
  if (!raw) return [];
  return JSON.parse(raw);
}
