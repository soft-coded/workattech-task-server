const asyncHandler = require("express-async-handler");
const fetch = require("node-fetch");

const constants = require("../utils/constants");
const Developer = require("../models/dev-profile");

const getAllDevs = asyncHandler(async (_, res) => {
	const devs = await Developer.find({}, "id avatar_url -_id").lean();
	res.status(200).json(devs);
});

const getOneDev = asyncHandler(async (req, res) => {
	const dev = await Developer.findOne(
		{ id: req.params.id },
		"-_id -__v"
	).lean();
	res.status(200).json(dev);
});

const createDev = asyncHandler(async (req, res) => {
	const githubData = await (
		await fetch(constants.githubApiURL + req.body.github_id)
	).json();

	const fetchedRepos = await (
		await fetch(constants.githubApiURL + req.body.github_id + "/repos")
	).json();

	const repos = fetchedRepos.map(repo => ({
		name: repo.name,
		html_url: repo.html_url,
		description: repo.description,
		updated_at: repo.updated_at
	}));

	// delete if already exists (since the values are being overridden)
	if (await Developer.exists({ id: githubData.login })) {
		await Developer.deleteOne({ id: githubData.login });
	}

	await Developer.create({
		id: githubData.login,
		avatar_url: githubData.avatar_url,
		name: githubData.name,
		company: githubData.company,
		blog: githubData.blog,
		location: githubData.location,
		email: githubData.email,
		bio: githubData.bio,
		github_id: githubData.login,
		linkedin_id: req.body.linkedin_id,
		codechef_id: req.body.codechef_id,
		hackerrank_id: req.body.hackerrank_id,
		twitter_id: req.body.twitter_id,
		medium_id: req.body.medium_id,
		repos
	});

	res.status(201).json({ id: githubData.login });
});

const deleteDev = asyncHandler(async (req, res) => {
	await Developer.deleteOne({ id: req.params.id });
	res.sendStatus(204);
});

module.exports = {
	createDev,
	getAllDevs,
	getOneDev,
	deleteDev
};
