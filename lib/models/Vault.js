import mongoose from "mongoose";

const VaultSchema = new mongoose.Schema({
  userEmail: { type: String, required: true, unique: true },
  vaultItems: [
    {
      id: String,
      title: String,
      username: String,
      password: String,
      url: String,
      notes: String,
    },
  ],
});

export default mongoose.models.Vault || mongoose.model("Vault", VaultSchema);
