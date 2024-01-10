import { Router } from "express";
const router = Router();

import UserController from "../controllers/user.controller.js";
import UserValidation from "../validations/user.validation.js";

import testUser from "../middleware/test-user.js";

router.get("/current-user", UserController.getCurrentUser);
router.patch(
	"/update-user",
	testUser,
	UserValidation.validateUpdateUserInput,
	UserController.updateUser
);

export default router;
