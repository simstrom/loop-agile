require('dotenv').config();

// DB Connection details. Set in .env file.
const env = process.env;
module.exports = {
	HOST: env.DB_HOST,
	USER: env.DB_USER,
	PASSWORD: env.DB_PASSWORD,
	DATABASE: env.DB_NAME,
	DIALECT: 'mysql',
};
