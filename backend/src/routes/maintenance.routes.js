import { Router } from "express";
import {
  getMaintenances,
  getMaintenance,
  getMaintenancesByVehicleId,
  createMaintenance,
  updateMaintenance,
  getMaintenancesByDriver,
  createMaintenanceDriver,
} from "../controllers/maintenance.controller.js";

import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";
import { maintenanceSchema } from "../schemas/maintenance.schemas.js";

const router = new Router();

router.get("/maintenance/", authRequired, getMaintenances);
router.get("/maintenance/:id", authRequired, getMaintenance);
router.get(
  "/maintenance/vehicle/:id",
  authRequired,
  getMaintenancesByVehicleId
);
router.post(
  "/maintenance",
  authRequired,
  validateSchema(maintenanceSchema),
  createMaintenance
);
router.put(
  "/maintenance/:id",
  validateSchema(maintenanceSchema),
  authRequired,
  updateMaintenance
);
router.get("/maintenanceDriver", authRequired, getMaintenancesByDriver);
router.post(
  "/maintenanceDriver",
  authRequired,
  validateSchema(maintenanceSchema),
  createMaintenanceDriver
);

export default router;
