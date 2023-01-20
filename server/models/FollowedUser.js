module.exports = (sequelize, DataTypes) => {
	const FollowedUser = sequelize.define('followedUser', {
		user_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'users',
				key: 'user_id',
			},
		},
		followed_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'users',
				key: 'user_id',
			},
		},
	});
	return FollowedUser;
};
