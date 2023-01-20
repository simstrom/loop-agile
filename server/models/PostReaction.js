module.exports = (sequelize, DataTypes) => {
	const PostReaction = sequelize.define('postReaction', {
		reaction_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		type: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isIn: [['up', 'down']],
			},
		},
	});
	return PostReaction;
};
