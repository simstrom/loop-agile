module.exports = (sequelize, DataTypes) => {
	const Comment = sequelize.define('comment', {
		comment_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		text: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
	return Comment;
};
