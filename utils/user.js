const enc = new TextEncoder();

function b64ToBuf(b64) {
  return Uint8Array.from(atob(b64), c => c.charCodeAt(0));
}
function bufToB64(buf) {
  const bytes = new Uint8Array(buf);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

async function deriveVerifier(password, saltB64) {
  const salt = saltB64 ? b64ToBuf(saltB64) : crypto.getRandomValues(new Uint8Array(16));
  const pwKey = await crypto.subtle.importKey("raw", enc.encode(password), { name: "PBKDF2" }, false, ["deriveBits"]);
  const verifierBits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt, iterations: 200000, hash: "SHA-256" }, pwKey, 256);
  return { saltB64: bufToB64(salt), verifierB64: bufToB64(verifierBits) };
}

export async function signup(email, password) {
  const usersRaw = localStorage.getItem("sv_users_v1");
  const users = usersRaw ? JSON.parse(usersRaw) : {};
  if (users[email]) throw new Error("User already exists");
  const { saltB64, verifierB64 } = await deriveVerifier(password);
  users[email] = { salt: saltB64, verifier: verifierB64 };
  localStorage.setItem("sv_users_v1", JSON.stringify(users));
  localStorage.setItem(`sv_vault_${email}`, JSON.stringify([]));
  return true;
}

export async function login(email, password) {
  const usersRaw = localStorage.getItem("sv_users_v1");
  if (!usersRaw) throw new Error("No user found");
  const users = JSON.parse(usersRaw);
  const rec = users[email];
  if (!rec) throw new Error("Invalid credentials");
  const { verifierB64 } = await deriveVerifier(password, rec.salt);
  if (verifierB64 !== rec.verifier) throw new Error("Invalid password");
  localStorage.setItem("sv_session", JSON.stringify({ email }));
  sessionStorage.setItem("sv_current_salt", rec.salt);
  sessionStorage.setItem("sv_current_email", email);
  return { email };
}

export function logout() {
  localStorage.removeItem("sv_session");
  sessionStorage.removeItem("sv_current_salt");
  sessionStorage.removeItem("sv_current_email");
}

export function currentUser() {
  if (typeof window === "undefined") return null; // server-side: return null
  const s = localStorage.getItem("sv_session");
  return s ? JSON.parse(s) : null;
}
