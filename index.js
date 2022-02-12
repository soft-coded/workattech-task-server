require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connect } = require("mongoose");

const router = require("./routes");
const { CustomError, handleError } = require("./utils/error-handler");

const app = express();

// app setup
const whitelist = [process.env.WEBSITE_URL, "http://localhost:3000"];
app.use(
	cors({
		origin: (origin, cb) =>
			whitelist.indexOf(origin) > -1
				? cb(null, true)
				: cb(new Error("Not allowed by CORS"))
	})
);
app.use(express.json());

connect(process.env.DB_URL)
	.then(() => console.log("Connected to database"))
	.catch(err => {
		console.error(err);
		process.exit(-1);
	});

// routing
app.use(router);

// 404 route
app.use("*", () => {
	throw new CustomError(404, "Route not found");
});

// error handler
app.use(handleError);

app.listen(process.env.PORT || 5000, () => console.log("Server started"));
