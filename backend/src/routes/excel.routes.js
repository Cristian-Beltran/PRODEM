import { Router } from "express";
import { exportToXls } from "../controllers/excel.controller.js";

import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";
import { ExcelSchema } from "../schemas/excel.schemas.js";

const router = new Router();


router.post("/download", authRequired, validateSchema(ExcelSchema), exportToXls);

export default router;