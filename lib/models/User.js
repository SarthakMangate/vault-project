import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  salt: { type: String, required: true },
  verifier: { type: String, required: true },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
