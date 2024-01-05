import * as dotenv from "dotenv";
dotenv.config();
import "express-async-errors";

// express
import express from "express";
const app = express();

// routes
import route from "./routes/index.js";

// packages
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import logger from "./configs/logger.js";

// error handler
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(mongoSanitize());
app.use(cors());

app.use("/api", route);

// log internal errors
app.use(logger);

app.use("*", notFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;
