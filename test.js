import mongoose from "mongoose";";
  
MONGO_URI="Your_URI";

mongoose.connect(uri)
  .then(() => console.log("Connected successfully"))
  .catch((err) => console.error("Connection failed:", err))
  .finally(() => mongoose.disconnect());
