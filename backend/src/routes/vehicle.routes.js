import { Router } from "express";

import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";
import { VehicleSchema } from "../schemas/vehicle.schemas.js";
import {
  createVehicle,
  getVehicle,
  getVehicles,
  updateVehicle,
  uploadPhoto,
} from "../controllers/vehicle.controllers.js";
import { uploadImage } from "../middlewares/image.middlewares.js";

const router = new Router();

router.get("/vehicle/", authRequired, getVehicles);
router.get("/vehicle/:id", authRequired, getVehicle);

router.post(
  "/vehicle",
  authRequired,
  validateSchema(VehicleSchema),
  createVehicle
);
router.put(
  "/vehicle/:id",
  validateSchema(VehicleSchema),
  authRequired,
  updateVehicle
);

router.post("/vehicle/photo/:id", authRequired, uploadImage, uploadPhoto);

export default router;