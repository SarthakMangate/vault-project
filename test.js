import mongoose from "mongoose";

const uri = "mongodb+srv://mangatesarthak633_db_user:demo-project@cluster0.shqgo1f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri)
  .then(() => console.log("Connected successfully"))
  .catch((err) => console.error("Connection failed:", err))
  .finally(() => mongoose.disconnect());
