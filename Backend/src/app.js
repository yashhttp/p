import express from "express";
import cors from "cors";

import routes from "./routes/index.js";
import errorHandler from "./middlewares/error.middleware.js";
import morganMiddleware from "./middlewares/logger.middleware.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganMiddleware);

// Routes
app.use("/api/v1", routes);

// test route
app.get("/", (req, res) => {
  res.send("AUTO FILL is  Running...");
});

// Error Middleware (LAST)
app.use(errorHandler);

export default app;