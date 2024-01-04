import { param } from "express-validator";
import withValidationErrors from "../middleware/validation.js";
import mongoose from "mongoose";
import { BadRequestError, NotFoundError } from "../errors/custom-error.js";
import { Job } from "../models/index.js";

export const validateIdParam = withValidationErrors([
	param("id").custom(async (value) => {
		const isValidId = mongoose.Types.ObjectId.isValid(value);
		if (!isValidId) throw new BadRequestError("invalid MongoDB id");

		const job = await Job.findById(value);
		if (!job) throw new NotFoundError(`no job with id ${value}`);
	}),
]);
