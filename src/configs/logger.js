import { transports, format } from "winston";
import expressWinston from "express-winston";

export default expressWinston.errorLogger({
	transports: [
		new transports.File({
			filename: "./src/logs/errors.log",
		}),
	],
	format: format.combine(
		format.timestamp({
			format: new Date().toLocaleString("en-US", {
				timeZone: "Asia/Ho_Chi_Minh",
			}),
		}),
		format.json(),
		format.prettyPrint()
	),
});
