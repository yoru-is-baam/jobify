import { Router } from "express";
const router = Router();

import JobController from "../controllers/job.controller.js";
import JobValidation from "../validations/job.validation.js";
import { validateIdParam } from "../validations/param.validation.js";
import testUser from "../middleware/test-user.js";

router
	.route("/")
	.get(JobController.getAllJobs)
	.post(testUser, JobValidation.validateJobInput, JobController.createJob);
router.route("/stats").get(JobController.showStats);
router
	.route("/:id")
	.get(validateIdParam, JobController.getJob)
	.delete(testUser, validateIdParam, JobController.deleteJob)
	.patch(
		testUser,
		validateIdParam,
		JobValidation.validateJobInput,
		JobController.updateJob
	);

export default router;
