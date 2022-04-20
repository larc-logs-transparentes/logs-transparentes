// Import Node.js crypto module
const crypto = require("crypto");

// Hashes data and returns a hex string
function hash(data) {
	return data != null
		? crypto
			.createHash("sha256")
			.update(data.toString())
			.digest("hex")
		: "";
}

// Export the function
module.exports = hash;