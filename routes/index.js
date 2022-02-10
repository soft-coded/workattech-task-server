const router = require("express").Router();
const { body } = require("express-validator");

const { validateRequest, isValidUser } = require("../controllers/validation");
const { createDev } = require("../controllers/developer");

router.get("/", (_, res) => {
	res.send("Server running");
});

const apiRoute = "/api";

router
	.route(apiRoute + "/developers")
	.post(
		body("github_id")
			.exists({ checkFalsy: true })
			.withMessage("GitHub ID is required"),
		validateRequest,
		isValidUser,
		createDev
	);

module.exports = router;
