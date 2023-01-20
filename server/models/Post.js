module.exports = (sequelize, DataTypes) => {
	const Post = sequelize.define('post', {
		post_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		text: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		image: {
			type: DataTypes.BOOLEAN,
		},
	});
	return Post;
};
