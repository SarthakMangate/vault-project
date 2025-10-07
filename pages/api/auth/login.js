import dbConnect from "../../../lib/db";
import User from "../../../lib/models/User";
import { deriveVerifier } from "../../../lib/crypto";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Missing fields" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const { verifierB64 } = await deriveVerifier(password, user.salt);
    if (verifierB64 !== user.verifier) return res.status(401).json({ message: "Invalid password" });

    res.status(200).json({ email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
