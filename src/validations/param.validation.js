import { param } from "express-validator";
import withValidationErrors from "../middleware/validation.js";
import mongoose from "mongoose";
import {
	BadRequestError,
	NotFoundError,
	UnauthorizedError,
} from "../errors/custom-errors.js";
import { Job } from "../models/index.js";

export const validateIdParam = withValidationErrors([
	param("id").custom(async (value, { req }) => {
		const isValidId = mongoose.Types.ObjectId.isValid(value);
		if (!isValidId) throw new BadRequestError("invalid id");

		const job = await Job.findById(value);
		if (!job) throw new NotFoundError(`no job with id ${value}`);

		// const isAdmin = req.user.role === "admin";
		const isOwner = req.user.userId === job.createdBy.toString();
		if (!isOwner)
			throw new UnauthorizedError("not authorized to access this route");
	}),
]);
