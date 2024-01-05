import { body } from "express-validator";
import withValidationErrors from "../middleware/validation.js";
import { User } from "../models/index.js";
import { BadRequestError } from "../errors/custom-errors.js";

const validateUpdateUserInput = withValidationErrors([
	body("name").notEmpty().withMessage("name is required"),
	body("email")
		.notEmpty()
		.withMessage("email is required")
		.isEmail()
		.withMessage("invalid email format")
		.custom(async (email, { req }) => {
			const user = await User.findOne({ email });
			if (user && user._id.toString() !== req.user.userId)
				throw new BadRequestError("email already exists");
		}),
	body("location").notEmpty().withMessage("location is required"),
	body("lastName").notEmpty().withMessage("last name is required"),
]);

export default {
	validateUpdateUserInput,
};
