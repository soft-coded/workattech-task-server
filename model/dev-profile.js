const { Schema, model } = require("mongoose");

const profileSchema = new Schema({
	id: {
		type: String,
		required: true
	},
	avatar_url: String,
	name: String,
	company: String,
	blog: String,
	location: String,
	email: String,
	bio: String,
	github_id: {
		type: String,
		required: true
	},
	linkedin_id: String,
	codechef_id: String,
	hackerrank_id: String,
	twitter_id: String,
	medium_id: String,
	repos: [
		{
			name: String,
			html_url: String,
			description: String,
			updated_at: {
				type: Date,
				default: Date.now
			}
		}
	]
});

module.exports = model("Developer", profileSchema);
