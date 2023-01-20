const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/db.config');

// Init DB connection.
const sequelize = new Sequelize(config.DATABASE, config.USER, config.PASSWORD, {
	host: config.HOST,
	dialect: config.DIALECT,
});

// Include Models
const User = require('./User')(sequelize, DataTypes);
const Post = require('./Post')(sequelize, DataTypes);
const PostReaction = require('./PostReaction')(sequelize, DataTypes);
const Comment = require('./Comment')(sequelize, DataTypes);
const CommentReaction = require('./CommentReaction')(sequelize, DataTypes);
const FollowedUser = require('./FollowedUser')(sequelize, DataTypes);

// --- ASSOCIATIONS -------------------------
// POSTS
User.hasMany(Post, {
	foreignKey: 'user_id',
	onDelete: 'cascade',
	hooks: true,
});
Post.belongsTo(User, {
	foreignKey: 'user_id',
});

// POST REACTIONS
Post.hasMany(PostReaction, {
	foreignKey: 'post_id',
	onDelete: 'cascade',
	hooks: true,
});
PostReaction.belongsTo(Post, {
	foreignKey: 'post_id',
});

User.hasMany(PostReaction, {
	foreignKey: 'user_id',
	onDelete: 'cascade',
	hooks: true,
});
PostReaction.belongsTo(User, {
	foreignKey: 'user_id',
});

// COMMENTS
Post.hasMany(Comment, {
	foreignKey: 'post_id',
	onDelete: 'cascade',
	hooks: true,
});
Comment.belongsTo(Post, {
	foreignKey: 'post_id',
});

User.hasMany(Comment, {
	foreignKey: 'user_id',
	onDelete: 'cascade',
	hooks: true,
});
Comment.belongsTo(User, {
	foreignKey: 'user_id',
});

// COMMENT REACTIONS
Comment.hasMany(CommentReaction, {
	foreignKey: 'comment_id',
	onDelete: 'cascade',
	hooks: true,
});
CommentReaction.belongsTo(Comment, {
	foreignKey: 'comment_id',
});

User.hasMany(CommentReaction, {
	foreignKey: 'user_id',
	onDelete: 'cascade',
	hooks: true,
});
CommentReaction.belongsTo(User, {
	foreignKey: 'user_id',
});

// FOLLOWERS / FOLLOWING
// This is a bit special since table has a M:N relationship with itself.
User.belongsToMany(User, {
	foreignKey: 'user_id',
	as: 'following',
	through: FollowedUser,
});
User.belongsToMany(User, {
	foreignKey: 'followed_id',
	as: 'followers',
	through: FollowedUser,
});

module.exports = {
	sequelize,
	User,
	Post,
	PostReaction,
	Comment,
	CommentReaction,
	FollowedUser,
};
