import { StatusCodes } from "http-status-codes";
import { User } from "../models/index.js";
import { UnauthenticatedError } from "../errors/custom-errors.js";
import { createJWT } from "../utils/token.js";

const register = async (req, res) => {
	const isFirstAccount = (await User.countDocuments()) === 0;
	req.body.role = isFirstAccount ? "admin" : "user";
	const user = await User.create(req.body);
	res.status(StatusCodes.CREATED).json({ status: "success", user });
};

const login = async (req, res) => {
	const user = await User.findOne({ email: req.body.email });
	const isValidUser = user && (await user.comparePassword(req.body.password));
	if (!isValidUser) throw new UnauthenticatedError("invalid credentials");

	const accessToken = createJWT({ userId: user._id, role: user.role });
	const ONE_DAY = 1000 * 60 * 60 * 24;

	res.cookie("accessToken", accessToken, {
		httpOnly: true,
		expires: new Date(Date.now() + ONE_DAY),
		secure: process.env.NODE_ENV === "production",
	});

	res
		.status(StatusCodes.OK)
		.json({ status: "success", message: "user logged in" });
};

const logout = async (req, res) => {
	res.cookie("accessToken", "logout", {
		httpOnly: true,
		expires: new Date(Date.now()),
	});
	res
		.status(StatusCodes.OK)
		.json({ status: "success", message: "user logged out!" });
};

export default {
	register,
	login,
	logout,
};
