import { Router } from "express";

import { authRequired } from "../middlewares/validateToken.js";

import {
  getRoute,
  getRoutesDriver,
  getRoutesCarrier,
  getRoutesComplete,
  getRoutes,
  createRoute,
  updateRoute,
  deleteRoute,
} from "../controllers/route.controllers.js";

const router = new Router();

router.get("/route", authRequired, getRoutes);
router.get("/route/driver", authRequired, getRoutesDriver);
router.get("/route/carrier", authRequired, getRoutesCarrier);
router.get("/route/complete", authRequired, getRoutesComplete);
router.get("/route/id/:id", authRequired, getRoute);
router.post("/route", authRequired, createRoute);
router.put("/route/:id", authRequired, updateRoute);
router.delete("/route/:id", authRequired, deleteRoute);

export default router;
