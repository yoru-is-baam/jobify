import { Router } from "express";
const router = Router();

import AuthRouter from "./auth.route.js";
import JobRouter from "./job.route.js";

import { authenticateUser } from "../middleware/authentication.js";

router.use("/v1/auth", AuthRouter);
router.use("/v1/jobs", authenticateUser, JobRouter);

export default router;
