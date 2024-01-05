import { StatusCodes } from "http-status-codes";
import { User } from "../models/index.js";

const getCurrentUser = async (req, res) => {
	const user = await User.findById(req.user.userId);
	res.status(StatusCodes.OK).json({ status: "success", user });
};

const updateUser = async (req, res) => {
	const { obj } = { ...req.body };
	delete obj.password;
	const updatedUser = await User.findByIdAndUpdate(req.user.userId, obj);
	res
		.status(StatusCodes.OK)
		.json({ status: "success", data: { message: "user updated" } });
};

export default {
	getCurrentUser,
	updateUser,
};
