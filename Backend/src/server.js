import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// DB CONNECT
connectDB();

// START SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});