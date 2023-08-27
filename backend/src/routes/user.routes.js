import { Router } from "express";
import {
  changeStatusUser,
  createUser,
  getUser,
  getUsers,
  getManagers,
  updatePasswordUser,
  updateUser,
  getManagersPaf,
  getManagerPaf,
} from "../controllers/user.controller.js";

import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";
import { UserSchema } from "../schemas/user.schemas.js";

const router = new Router();

router.get("/user/:type", authRequired, getUsers);
router.get("/manager", authRequired, getManagers);
router.get("/manager/paf/", authRequired, getManagersPaf);
router.get("/manager/paf/:id", authRequired, getManagerPaf);
router.get("/user/id/:id", authRequired, getUser);
router.post("/user", authRequired, validateSchema(UserSchema), createUser);
router.put("/user/status/:id", authRequired, changeStatusUser);
router.put("/user/:id", validateSchema(UserSchema), authRequired, updateUser);
router.put("/user/password/:id", authRequired, updatePasswordUser);

export default router;
