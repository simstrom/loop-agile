require('dotenv').config();

// DB Connection details. Set in .env file.
const env = process.env;
module.exports = {
	URI: env.DB_URI,
};
