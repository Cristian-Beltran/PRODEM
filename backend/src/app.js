import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";

const app = express();
//Config
app.set("appName", "Rutas prodem");
app.set("port", process.env.PORT || 3000);
// Middleware
app.use(
  cors({
    origin: ["https://rutas-prodem.netlify.app", "http://localhost:5173"],
    //origin: "https://envibol.netlify.app",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
// Routes
app.use("/api", authRoutes);

export default app;
