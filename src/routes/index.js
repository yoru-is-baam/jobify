import { Router } from "express";
const router = Router();

import AuthRouter from "./auth.route.js";
import JobRouter from "./job.route.js";

router.use("/v1/auth", AuthRouter);
router.use("/v1/jobs", JobRouter);

export default router;
