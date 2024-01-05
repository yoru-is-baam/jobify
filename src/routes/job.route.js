import { Router } from "express";
const router = Router();

import JobController from "../controllers/job.controller.js";
import JobValidation from "../validations/job.validation.js";
import { validateIdParam } from "../validations/param.validation.js";

router
	.route("/")
	.get(JobController.getAllJobs)
	.post(JobValidation.validateJobInput, JobController.createJob);
router.route("/stats").get(JobController.showStats);
router
	.route("/:id")
	.get(validateIdParam, JobController.getJob)
	.delete(validateIdParam, JobController.deleteJob)
	.patch(
		validateIdParam,
		JobValidation.validateJobInput,
		JobController.updateJob
	);

export default router;
