import { Router } from "express";
import {
    getFuelings,
    getFueling,
    createFueling,
    updateFueling,
    getFuelingsByVehicleId,
    getFuelingsByDriverId,
    getFuelingsByMonthAndYear,
} from "../controllers/fueling.controller.js";

import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";
import { FuelingSchema } from "../schemas/fueling.schemas.js";

const router = new Router();

router.get("/fueling/", authRequired, getFuelings)
router.get("/fueling/:id", authRequired, getFueling)
router.get("/fueling/vehicle/:id", authRequired, getFuelingsByVehicleId)
router.get("/fueling/driver/:id", authRequired, getFuelingsByDriverId)
router.get("/fueling/time/:month/:year", authRequired, getFuelingsByMonthAndYear)
router.post(
    "/fueling",
    authRequired,
    validateSchema(FuelingSchema),
    createFueling
)
router.put(
    "/fueling/:id",
    validateSchema(FuelingSchema),
    authRequired,
    updateFueling
)

export default router;
