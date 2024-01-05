import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
	const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
	const status =
		statusCode === StatusCodes.INTERNAL_SERVER_ERROR ? "error" : "fail";
	const message = err.message || "something went wrong, try again later";

	return res.status(statusCode).json({
		status,
		data: {
			message,
		},
	});
};

export default errorHandlerMiddleware;
