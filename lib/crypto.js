const enc = new TextEncoder();

export function b64ToBuf(b64) {
  return Uint8Array.from(Buffer.from(b64, "base64"));
}

export function bufToB64(buf) {
  return Buffer.from(buf).toString("base64");
}

/**
 * Derive a verifier and salt using PBKDF2
 */
export async function deriveVerifier(password, saltB64) {
  const crypto = globalThis.crypto || require("crypto").webcrypto;
  const salt = saltB64 ? b64ToBuf(saltB64) : crypto.getRandomValues(new Uint8Array(16));
  const pwKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );
  const verifierBits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: 200000, hash: "SHA-256" },
    pwKey,
    256
  );
  return { saltB64: bufToB64(salt), verifierB64: bufToB64(verifierBits) };
}
