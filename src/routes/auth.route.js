import { Router } from "express";
const router = Router();

import rateLimiter from "express-rate-limit";
import { config } from "../configs/config.js";

const apiLimiter = rateLimiter(config.rateLimiter);

import AuthController from "../controllers/auth.controller.js";
import AuthValidation from "../validations/auth.validation.js";

router.post(
	"/register",
	apiLimiter,
	AuthValidation.validateRegisterInput,
	AuthController.register
);
router.post(
	"/login",
	apiLimiter,
	AuthValidation.validateLoginInput,
	AuthController.login
);
router.get("/logout", AuthController.logout);

export default router;
