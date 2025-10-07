import dbConnect from "../../../lib/db";
import User from "../../../lib/models/User";
import Vault from "../../../lib/models/Vault";
import { deriveVerifier } from "../../../lib/crypto";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Missing fields" });

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "User already exists" });

    const { saltB64, verifierB64 } = await deriveVerifier(password);

    await User.create({ email, salt: saltB64, verifier: verifierB64 });
    await Vault.create({ userEmail: email, encryptedItems: { iv: "", ciphertext: "[]" } });

    res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
