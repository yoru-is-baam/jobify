import mongoose from "mongoose";
import { Job } from "../models/index.js";
import { StatusCodes } from "http-status-codes";

const getAllJobs = async (req, res) => {
	// const filter =
	// 	req.user.role === "admin" ? {} : { createdBy: req.user.userId };
	const jobs = await Job.find({ createdBy: req.user.userId });
	res.status(StatusCodes.OK).json({
		status: "success",
		data: { jobs, totalJobs: jobs.length, numOfPages: 1 },
	});
};

const createJob = async (req, res) => {
	req.body.createdBy = req.user.userId;
	const job = await Job.create(req.body);
	res.status(StatusCodes.CREATED).json({ status: "success", data: { job } });
};

const getJob = async (req, res) => {
	const job = await Job.findById(req.params.id);
	res.status(StatusCodes.OK).json({ status: "success", data: { job } });
};

const updateJob = async (req, res) => {
	const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res.status(StatusCodes.OK).json({
		status: "success",
		data: { message: "job modified" },
	});
};

const deleteJob = async (req, res) => {
	const removedJob = await Job.findByIdAndDelete(req.params.id);
	res.status(StatusCodes.OK).json({
		status: "success",
		data: { message: "job deleted" },
	});
};

const showStats = async (req, res) => {
	let stats = await Job.aggregate([
		{ $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
	]);
	res.status(StatusCodes.OK).json({ status: "success", data: { stats } });
};

export default {
	getAllJobs,
	createJob,
	getJob,
	deleteJob,
	updateJob,
	showStats,
};
