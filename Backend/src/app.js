import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import { helmetConfig } from "./security/helmet.js";
import { globalLimiter } from "./security/rateLimiter.js";
import { sanitizeMiddleware } from "./security/sanitizer.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();

// SECURITY
app.use(helmetConfig);
app.use(globalLimiter);
app.use(sanitizeMiddleware);

//  CORE 
app.use(cors({
  origin: "*",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// HEALTH CHECK 
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Auto Form AI Backend is running 🚀",
  });
});

// ERROR HANDLER
app.use(errorMiddleware);

export default app;