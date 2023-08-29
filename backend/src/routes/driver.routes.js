import { Router } from "express";
import {
  createDriver,
  getDriver,
  getDriverVehicle,
  getDrivers,
  getDriversVehicle,
  updateDriver,
} from "../controllers/driver.controller.js";

import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";
import { DriverSchema } from "../schemas/driver.schemas.js";

const router = new Router();

router.get("/driver/", authRequired, getDrivers);
router.get("/driver/:id", authRequired, getDriver);
router.post(
  "/driver",
  authRequired,
  validateSchema(DriverSchema),
  createDriver
);
router.put(
  "/driver/:id",
  authRequired,
  validateSchema(DriverSchema),
  updateDriver
);

router.get("/drivervehicle/", authRequired, getDriversVehicle);
router.get("/drivervehicle/:id", authRequired, getDriverVehicle);

export default router;
