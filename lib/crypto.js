const enc = new TextEncoder();
const dec = new TextDecoder();

function b64ToBuf(b64) {
  return Uint8Array.from(atob(b64), c => c.charCodeAt(0));
}
function bufToB64(buf) {
  const bytes = new Uint8Array(buf);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

export async function deriveKeyFromPassword(password, saltB64) {
  const salt = saltB64 ? b64ToBuf(saltB64) : crypto.getRandomValues(new Uint8Array(16));
  const pwKey = await crypto.subtle.importKey("raw", enc.encode(password), { name: "PBKDF2" }, false, ["deriveBits","deriveKey"]);
  const key = await crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: 200000, hash: "SHA-256" },
    pwKey,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt","decrypt"]
  );
  const verifierBits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt, iterations: 200000, hash: "SHA-256" }, pwKey, 256);
  return { key, saltB64: bufToB64(salt), verifierB64: bufToB64(verifierBits) };
}

export async function encryptJSON(key, payload) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const data = enc.encode(JSON.stringify(payload));
  const ct = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, data);
  return { iv: bufToB64(iv), ciphertext: bufToB64(ct) };
}

export async function decryptJSON(key, ivB64, ciphertextB64) {
  const iv = b64ToBuf(ivB64);
  const ct = b64ToBuf(ciphertextB64);
  const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ct);
  return JSON.parse(dec.decode(plain));
}
