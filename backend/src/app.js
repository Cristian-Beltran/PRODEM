import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import driverRoutes from "./routes/driver.routes.js";
import pafRoutes from "./routes/paf.routes.js";
import incidentRoutes from "./routes/incident.routes.js";
import vehicleRoutes from "./routes/vehicle.routes.js";
import fuelingRoutes from "./routes/fueling.routes.js";

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

const staticFolderPath = new URL("uploads", import.meta.url).pathname;

app.use("/api/static", express.static(staticFolderPath)); // Ruta a la carpeta de imágenes
// Middleware para depuración de la ruta estática

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", driverRoutes);
app.use("/api", pafRoutes);
app.use("/api", incidentRoutes);
app.use("/api", vehicleRoutes);
app.use("/api", fuelingRoutes);

export default app;
