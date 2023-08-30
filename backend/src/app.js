import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import driverRoutes from "./routes/driver.routes.js";
import pafRoutes from "./routes/paf.routes.js";
import incidentRoutes from "./routes/incident.routes.js";
import fuelingRoutes from "./routes/fueling.routes.js";
import verifyVehicleRoutes from "./routes/verifyVehicle.routes.js";

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
app.use("/api", userRoutes);
app.use("/api", driverRoutes);
app.use("/api", pafRoutes);
app.use("/api", incidentRoutes);
app.use("/api", fuelingRoutes);
app.use("/api", verifyVehicleRoutes);

export default app;
