import {
	UnauthenticatedError,
	UnauthorizedError,
} from "../errors/custom-errors.js";
import { verifyJWT } from "../utils/token.js";

export const authenticateUser = (req, res, next) => {
	const { accessToken } = req.cookies;
	if (!accessToken) throw new UnauthenticatedError("authentication invalid");

	try {
		const { userId } = verifyJWT(accessToken);
		const testUser = userId === "659d62798a93f8f1a41911df";
		req.user = { userId, testUser };
		next();
	} catch (error) {
		throw new UnauthenticatedError("authentication invalid");
	}
};

// export const authorizePermissions = (...roles) => {
// 	return (req, res, next) => {
// 		if (!roles.includes(req.user.role)) {
// 			throw new UnauthorizedError("Unauthorized to access this route");
// 		}
// 		next();
// 	};
// };
