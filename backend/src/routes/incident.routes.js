import { Router } from "express";
import {
  completeIncident,
  createIncident,
  getIncedents,
  updateIncedent,
  getIncident,
} from "../controllers/incident.controller.js";

import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";
import { IncidentSchema } from "../schemas/incident.schemas.js";

const router = new Router();

router.get("/incident/", authRequired, getIncedents);
router.get("/incident/:id", authRequired, getIncident);
router.put("/incident/complete/:id", authRequired, completeIncident);
router.post(
  "/incident",
  authRequired,
  validateSchema(IncidentSchema),
  createIncident
);
router.put(
  "/incident/:id",
  validateSchema(IncidentSchema),
  authRequired,
  updateIncedent
);

export default router;
