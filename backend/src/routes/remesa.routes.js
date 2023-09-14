import { Router } from "express";

import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";
import {
  getRemesasSender,
  getRemesasReceive,
  getRemesasComplete,
  getRemesasIncomplete,
  getRemesa,
  createRemesa,
  deleteRemesa,
  updateRemesaByAdmin,
  updateRemesaByManager,
  getRemesasCompleteByManager,
  getRemesasRoute,
  getRemesasRouteComplete,
  sendRemesa,
  receiveRemesa,
  generateHash,
} from "../controllers/remesa.controllers.js";
import {
  RemesaAdminSchema,
  RemesaManagerSchema,
} from "../schemas/remesa.schemas.js";

const router = new Router();
router.get("/remesa/sender/", authRequired, getRemesasSender);
router.get("/remesa/receive/", authRequired, getRemesasReceive);
router.get(
  "/remesa/manager/complete",
  authRequired,
  getRemesasCompleteByManager
);
router.get("/remesa/complete", authRequired, getRemesasComplete);
router.get("/remesa/incomplete", authRequired, getRemesasIncomplete);
router.get("/remesa/id/:id", authRequired, getRemesa);
router.post("/remesa", authRequired, createRemesa);
router.delete("/remesa/:id", authRequired, deleteRemesa);
router.put(
  "/remesa/admin/:id",
  validateSchema(RemesaAdminSchema),
  authRequired,
  updateRemesaByAdmin
);
router.put(
  "/remesa/manager/:id",
  validateSchema(RemesaManagerSchema),
  authRequired,
  updateRemesaByManager
);
router.get("/remesa/route/:id", authRequired, getRemesasRoute);
router.get("/remesa/routeComplete/:id", authRequired, getRemesasRouteComplete);

router.put("/remesa/send/:hash", authRequired, sendRemesa);
router.put("/remesa/received/:hash", authRequired, receiveRemesa);
router.get("/remesa/hash/:id", authRequired, generateHash)

export default router;
