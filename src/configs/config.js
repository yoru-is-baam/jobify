export const config = {
	rateLimiter: {
		windowMs: 15 * 60 * 1000, // 15 minutes
		max: 10,
		message:
			"Too many many request from this IP address, please try again after 15 minutes",
	},
};
