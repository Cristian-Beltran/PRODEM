import { Router } from "express";
import {
    getTypeMaintenances,
    getTypeMaintenance,
    createTypeMaintenance,
    updateTypeMaintenance
} from "../controllers/typeMaintenance.controller.js";

import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";
import { typeMaintenanceSchema } from "../schemas/typeMaintenance.schemas.js";

const router = new Router();

router.get("/typeMaintenance/", authRequired, getTypeMaintenances);
router.get("/typeMaintenance/:id", authRequired, getTypeMaintenance);
router.post(
    "/typeMaintenance",
    authRequired,
    validateSchema(typeMaintenanceSchema),
    createTypeMaintenance
);
router.put(
    "/typeMaintenance/:id",
    validateSchema(typeMaintenanceSchema),
    authRequired,
    updateTypeMaintenance
);

export default router;