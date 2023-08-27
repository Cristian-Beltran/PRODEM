import { Router } from "express";

import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";
import {
  createPaf,
  getPaf,
  getPafs,
  updatePaf,
} from "../controllers/paf.controllers.js";
import { PafSchema } from "../schemas/paf.schemas.js";

const router = new Router();

router.get("/paf/", authRequired, getPafs);
router.get("/paf/:id", authRequired, getPaf);
router.post("/paf", authRequired, validateSchema(PafSchema), createPaf);
router.put("/paf/:id", authRequired, validateSchema(PafSchema), updatePaf);

export default router;
