import { Router } from "express";
import {
    getVerifyVehicles,
    getVerifyVehicle,
    createVerifyVehicle,
    updateVerifyVehicle,
    getVerifyVehicleByVehicleId,
    getVerifyVehicleByDriverId,
    getVerifyVehicleByGuardId,
} from "../controllers/verifyVehicle.controlller.js";

import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";
import { VerifyVehicleSchema } from "../schemas/verifyVehicle.schemas.js";

const router = new Router();

// TODO: Revisar si la mayuscula de Vehicle es necesaria:
router.get("/verifyVehicle/", authRequired, getVerifyVehicles)
router.get("/verifyVehicle/:id", authRequired, getVerifyVehicle)
router.get("/verifyVehicle/vehicle/:id", authRequired, getVerifyVehicleByVehicleId)
router.get("/verifyVehicle/driver/:id", authRequired, getVerifyVehicleByDriverId)
router.get("/verifyVehicle/guard/:id", authRequired, getVerifyVehicleByGuardId)
router.post(
  "/verifyVehicle",
  authRequired,
  validateSchema(VerifyVehicleSchema),
  createVerifyVehicle
);
router.put(
  "/verifyVehicle/:id",
  validateSchema(VerifyVehicleSchema),
  authRequired,
  updateVerifyVehicle
);

export default router;
