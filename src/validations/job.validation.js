import { body } from "express-validator";
import withValidationErrors from "../middleware/validation.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";

const validateJobInput = withValidationErrors([
	body("company").notEmpty().withMessage("company is required"),
	body("position").notEmpty().withMessage("position is required"),
	body("jobLocation").notEmpty().withMessage("job location is required"),
	body("jobStatus")
		.isIn(Object.values(JOB_STATUS))
		.withMessage("invalid status value"),
	body("jobType")
		.isIn(Object.values(JOB_TYPE))
		.withMessage("invalid type value"),
]);

export default {
	validateJobInput,
};
