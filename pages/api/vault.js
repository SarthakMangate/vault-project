import dbConnect from "../../lib/db";
import Vault from "../../lib/models/Vault";

export default async function handler(req, res) {
  await dbConnect();

  const { email } = req.query;
  if (!email) return res.status(400).json({ message: "Missing email" });

  try {
    // Find the vault for this user
    let vault = await Vault.findOne({ userEmail: email });

    // Create vault for new user if not exists
    if (!vault) {
      vault = new Vault({ userEmail: email, vaultItems: [] });
      await vault.save();
    }

    if (req.method === "GET") {
      // Return vaultItems array
      return res.status(200).json({ vaultItems: vault.vaultItems || [] });
    }

    if (req.method === "POST") {
      const { vaultItems } = req.body;
      if (!vaultItems) return res.status(400).json({ message: "Missing vaultItems" });

      // Save vaultItems directly
      vault.vaultItems = vaultItems;
      await vault.save();

      return res.status(200).json({ vaultItems: vault.vaultItems });
    }

    res.status(405).json({ message: "Method not allowed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}
