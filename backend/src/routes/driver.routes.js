import { Router } from "express";
import {
  createDriver,
  getDriver,
  getDrivers,
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
router.put("/driver/:id", validateSchema(DriverSchema), authRequired, updateDriver);

export default router;
