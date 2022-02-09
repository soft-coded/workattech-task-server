const router = require("express").Router();

router.get("/", (_, res) => {
	res.send("Server running");
});

module.exports = router;
