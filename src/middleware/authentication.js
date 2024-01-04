import { UnauthenticatedError } from "../errors/custom-errors.js";
import { verifyJWT } from "../utils/token.js";

export const authenticateUser = async (req, res, next) => {
	const { accessToken } = req.cookies;
	if (!accessToken) throw new UnauthenticatedError("authentication invalid");

	try {
		const { userId, role } = verifyJWT(accessToken);
		req.user = { userId, role };
		next();
	} catch (error) {
		throw new UnauthenticatedError("authentication invalid");
	}
};
