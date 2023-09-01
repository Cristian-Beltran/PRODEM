import { Router } from "express";
import {
    getMaintenances,
    getMaintenance,
    createMaintenance,
    updateMaintenance
} from "../controllers/maintenance.controller.js";

import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";
import { maintenanceSchema } from "../schemas/maintenance.schemas.js";

const router = new Router();

router.get("/maintenance/", authRequired, getMaintenances);
router.get("/maintenance/:id", authRequired, getMaintenance);
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

export default router;