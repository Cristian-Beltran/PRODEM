import { Router } from "express";

import {
    getBags,
    getBag,
    createBag,
    updateBag,
    getBagsByRemesaId
} from "../controllers/bag.controller.js";

import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";
import { BagSchema } from "../schemas/bag.schemas.js";

const router = new Router();

router.get("/bag/", authRequired, getBags);
router.get("/bag/:id", authRequired, getBag);
router.get("/bag/remesa/:id", authRequired, getBagsByRemesaId);
router.post(
    "/bag",
    authRequired,
    validateSchema(BagSchema),
    createBag
);
router.put(
    "/bag/:id",
    validateSchema(BagSchema),
    authRequired,
    updateBag
);

export default router;