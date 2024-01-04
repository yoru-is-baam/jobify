import { Router } from "express";
const router = Router();

import AuthController from "../controllers/auth.controller.js";
import AuthValidation from "../validations/auth.validation.js";

router.post(
	"/register",
	AuthValidation.validateRegisterInput,
	AuthController.register
);
router.post("/login", AuthValidation.validateLoginInput, AuthController.login);
router.get("/logout", AuthController.logout);

export default router;
