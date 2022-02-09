const express = require("express");
const cors = require("cors");

const router = require("./routes");
const { CustomError, handleError } = require("./utils/error-handler");

const app = express();

// app setup
app.use(cors());
app.use(express.json());

// routing
app.use(router);

// 404 route
app.use("*", () => {
	throw new CustomError(404, "Route not found");
});

// error handler
app.use(handleError);

app.listen(process.env.PORT || 5000, () => console.log("Server started"));
