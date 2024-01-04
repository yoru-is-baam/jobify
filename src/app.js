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

// error handler
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}
app.use(express.json());

app.use("/api", route);

app.use("*", notFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;
