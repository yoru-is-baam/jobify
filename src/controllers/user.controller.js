import { StatusCodes } from "http-status-codes";
import { User } from "../models/index.js";

const getProfile = async (req, res) => {
	const user = await User.findById(req.user.userId);
	res.status(StatusCodes.OK).json({ status: "success", data: { user } });
};

const updateProfile = async (req, res) => {
	const { obj } = { ...req.body };
	delete obj.password;
	const updatedUser = await User.findByIdAndUpdate(req.user.userId, obj);
	res
		.status(StatusCodes.OK)
		.json({ status: "success", data: { message: "user updated" } });
};

export default {
	getProfile,
	updateProfile,
};
