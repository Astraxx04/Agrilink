const express = require("express");
const app = express();

require("dotenv").config();
require("express-async-errors");

const connectDB = require("./database/connect");
const marketRouter = require("./routes/market");
const locationRouter = require("./routes/locations");
const cropResultsRouter = require("./routes/cropResults");
const landResultsRouter = require("./routes/landResults");
const userRouter = require("./routes/user");
const docLinksRouter = require("./routes/docLinks");

const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/v1/", marketRouter);
app.use("/api/v1/", locationRouter);
app.use("/api/v1/", cropResultsRouter);
app.use("/api/v1/", landResultsRouter);
app.use("/api/v1/", userRouter);
app.use("/api/v1/", docLinksRouter);

const startServer = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		console.log("Database connection established successfully...");
		app.listen(port, console.log(`Server started on port ${port}...`));
	} catch (err) {
		console.log(err);
	}
};

startServer();