import { Router } from "express";
import {
  getVerifyVehicles,
  getVerifyVehicle,
  createVerifyVehicle,
  updateVerifyVehicle,
  getVerifyVehicleDriver,
  createVerifyVehicleDriver
} from "../controllers/verifyVehicle.controlller.js";

import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";
import { VerifyVehicleSchema } from "../schemas/verifyVehicle.schemas.js";

const router = new Router();

// TODO: Revisar si la mayuscula de Vehicle es necesaria:
router.get("/verifyVehicle/", authRequired, getVerifyVehicles);
router.get("/verifyVehicle/:id", authRequired, getVerifyVehicle);

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

router.get(
  "/verifyVehicleDriver",
  authRequired,
  getVerifyVehicleDriver
);
router.post(
  "/verifyVehicleDriver",
  authRequired,
  validateSchema(VerifyVehicleSchema),
  createVerifyVehicleDriver
);

export default router;
