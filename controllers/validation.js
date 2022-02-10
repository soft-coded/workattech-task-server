const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const fetch = require("node-fetch");

const { CustomError } = require("../utils/error-handler");
const constants = require("../utils/constants");

function validateRequest(req, _, next) {
	const vRes = validationResult(req);
	if (!vRes.isEmpty())
		throw new CustomError(400, vRes.array({ onlyFirstError: true })[0].msg);
	next();
}

const isValidUser = asyncHandler(async (req, _, next) => {
	const apiRes = await fetch(constants.githubApiURL + req.body.github_id);
	if (!apiRes.ok) throw new CustomError(apiRes.status, apiRes.statusText);
	next();
});

module.exports = {
	validateRequest,
	isValidUser
};
