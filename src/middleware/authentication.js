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
		req.user = { userId };
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
