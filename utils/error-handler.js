class CustomError extends Error {
	constructor(statusCode, message) {
		super(message);
		this.statusCode = statusCode;
	}
}

function handleError(err, _, res, __) {
	if (err instanceof CustomError)
		return res.status(err.statusCode).json({ message: err.message });

	res.status(500).json({ message: err.message });
}

module.exports = { CustomError, handleError };
