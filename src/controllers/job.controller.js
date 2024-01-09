import mongoose from "mongoose";
import { Job } from "../models/index.js";
import { StatusCodes } from "http-status-codes";
import dayjs from "dayjs";

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
		{ $group: { _id: "$jobStatus", count: { $sum: 1 } } },
	]);

	stats = stats.reduce((accumulator, currentValue) => {
		const { _id: title, count } = currentValue;
		accumulator[title] = count;
		return accumulator;
	}, {});

	const defaultStats = {
		pending: stats.pending || 0,
		interview: stats.interview || 0,
		declined: stats.declined || 0,
	};

	let monthlyApplications = await Job.aggregate([
		{ $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
		{
			$group: {
				_id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
				count: { $sum: 1 },
			},
		},
		{ $sort: { "_id.year": -1, "_id.month": -1 } },
		{ $limit: 6 },
	]);

	monthlyApplications = monthlyApplications
		.map((item) => {
			const {
				_id: { year, month },
				count,
			} = item;

			const date = dayjs()
				.month(month - 1)
				.year(year)
				.format("MMM YYYY");

			return { date, count };
		})
		.reverse();

	res
		.status(StatusCodes.OK)
		.json({ status: "success", data: { defaultStats, monthlyApplications } });
};

export default {
	getAllJobs,
	createJob,
	getJob,
	deleteJob,
	updateJob,
	showStats,
};
