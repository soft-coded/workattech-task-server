const router = require("express").Router();
const { body, param } = require("express-validator");

const {
	validateRequest,
	isValidGithubUser,
	isValidUser
} = require("../controllers/validation");
const {
	createDev,
	getAllDevs,
	getOneDev,
	deleteDev
} = require("../controllers/developer");

router.get("/", (_, res) => {
	res.send("Server running");
});

const apiRoute = "/api";

router
	.route(apiRoute + "/developers")
	.get(getAllDevs)
	.post(
		body("github_id")
			.exists({ checkFalsy: true })
			.withMessage("GitHub ID is required"),
		validateRequest,
		isValidGithubUser,
		createDev
	);

router
	.route(apiRoute + "/developers/:id")
	.get(
		param("id").exists({ checkFalsy: true }).withMessage("User ID is required"),
		validateRequest,
		isValidUser,
		getOneDev
	)
	.delete(
		param("id").exists({ checkFalsy: true }).withMessage("User ID is required"),
		validateRequest,
		isValidUser,
		deleteDev
	);

module.exports = router;
