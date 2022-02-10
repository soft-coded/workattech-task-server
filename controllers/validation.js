const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const fetch = require("node-fetch");

const { CustomError } = require("../utils/error-handler");
const constants = require("../utils/constants");
const Developer = require("../models/dev-profile");

function validateRequest(req, _, next) {
	const vRes = validationResult(req);
	if (!vRes.isEmpty())
		throw new CustomError(400, vRes.array({ onlyFirstError: true })[0].msg);
	next();
}

const isValidGithubUser = asyncHandler(async (req, _, next) => {
	const apiRes = await fetch(constants.githubApiURL + req.body.github_id);
	if (!apiRes.ok) throw new CustomError(400, "GitHub username is invalid");
	next();
});

const isValidUser = asyncHandler(async (req, _, next) => {
	if (!(await Developer.exists({ id: req.params.id })))
		throw new CustomError(404, "User does not exist");
	next();
});

module.exports = {
	validateRequest,
	isValidGithubUser,
	isValidUser
};
