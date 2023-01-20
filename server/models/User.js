const argon2 = require('argon2');

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('user', {
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		first_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		last_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		avatar: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 'https://avatars.dicebear.com/api/micah/random-seedphrase.svg?b=%23e2e8f0',
		},
	});

	// HOOKS
	// Adding hooks (triggers) to be sure password is saved as hashed value on user creation.
	User.beforeCreate(async (newUser) => {
		newUser.password = await argon2.hash(newUser.password, {
			type: argon2.argon2id,
		});

		// Also, seed a random avatar
		newUser.avatar = `https://avatars.dicebear.com/api/micah/${newUser.first_name}${newUser.last_name}.svg?b=%23e2e8f0`;
	});

	return User;
};
