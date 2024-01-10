import { body } from "express-validator";
import withValidationErrors from "../middleware/validation.js";
import { User } from "../models/index.js";
import { BadRequestError } from "../errors/custom-errors.js";

const validateRegisterInput = withValidationErrors([
	body("name").notEmpty().withMessage("name is required"),
	body("email")
		.notEmpty()
		.withMessage("email is required")
		.isEmail()
		.withMessage("invalid email format")
		.custom(async (email) => {
			const user = await User.findOne({ email });
			if (user) throw new BadRequestError("email already exists");
		}),
	body("password")
		.notEmpty()
		.withMessage("password is required")
		.isLength({ min: 8 })
		.withMessage("password must be at least 8 characters long"),
]);

const validateLoginInput = withValidationErrors([
	body("email")
		.notEmpty()
		.withMessage("email is required")
		.isEmail()
		.withMessage("invalid email format"),
	body("password").notEmpty().withMessage("password is required"),
]);

export default {
	validateRegisterInput,
	validateLoginInput,
};
