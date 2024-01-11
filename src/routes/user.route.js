import { Router } from "express";
const router = Router();

import UserController from "../controllers/user.controller.js";
import UserValidation from "../validations/user.validation.js";

import testUser from "../middleware/test-user.js";

router
	.route("/profile")
	.get(UserController.getProfile)
	.patch(
		testUser,
		UserValidation.validateUpdateUserInput,
		UserController.updateProfile
	);

export default router;
