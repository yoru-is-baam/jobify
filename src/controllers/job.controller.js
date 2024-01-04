import { Job } from "../models/index.js";
import { StatusCodes } from "http-status-codes";

const getAllJobs = async (req, res) => {
	const jobs = await Job.find({});
	res.status(StatusCodes.OK).json({ status: "success", jobs });
};

const createJob = async (req, res) => {
	const { company, position } = req.body;
	const job = await Job.create({ company, position });
	res.status(StatusCodes.CREATED).json({ status: "success", job });
};

const getJob = async (req, res) => {
	const job = await Job.findById(req.params.id);
	res.status(StatusCodes.OK).json({ status: "success", job });
};

const updateJob = async (req, res) => {
	const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res.status(StatusCodes.OK).json({ status: "success", job: updatedJob });
};

const deleteJob = async (req, res) => {
	const removedJob = await Job.findByIdAndDelete(req.params);
	res.status(StatusCodes.OK).json({ status: "success", job: removedJob });
};

export default {
	getAllJobs,
	createJob,
	getJob,
	deleteJob,
	updateJob,
};
