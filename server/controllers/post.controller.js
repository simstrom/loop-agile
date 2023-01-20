const { Post, PostReaction, Comment, CommentReaction, User } = require('../models');

// --- POSTS -------------------------
// Fetches all posts. Eager loaded with author, comments and reactions.
module.exports.getAllPosts = async (req, res) => {
	const posts = await Post.findAll({
		include: [
			{
				model: User,
			},
			{
				model: Comment,
			},
			{
				model: PostReaction,
			},
		],
	});
	res.json(posts);
};

// Creates a new post.
module.exports.createPost = async (req, res) => {
	const { text, user_id, image } = req.body;
	const post = await Post.create({
		text,
		user_id,
		image: image ? true : false,
	});
	res.json(post);
};

// Gets a single post. Eager loaded with author, reactions, comment.
// Comment is also eager loaded with authors and reactions.
module.exports.getPost = async (req, res) => {
	const post = await Post.findByPk(req.params.postId, {
		include: [
			{
				model: User,
			},
			{
				model: PostReaction,
			},
			{
				model: Comment,
			},
			{
				model: Comment,
				include: User,
			},
			{
				model: Comment,
				include: CommentReaction,
			},
		],
	});
	res.json(post);
};

// Updates a single post.
module.exports.updatePost = async (req, res) => {
	const updatedPost = await Post.findOne({
		where: {
			post_id: req.params.postId,
		},
	});
	updatedPost.text = req.body.text;
	await updatedPost.save();
	res.json(updatedPost);
};

// Deletes a single post.
module.exports.removePost = async (req, res) => {
	const post = await Post.findOne({
		where: {
			post_id: req.params.postId,
		},
	});
	await post.destroy();
	res.sendStatus(200);
};

// --- REACTIONS -------------------------
// creates a new reaction
module.exports.addReaction = async (req, res) => {
	const reaction = await PostReaction.create({
		type: req.body.type,
		post_id: req.params.postId,
		user_id: req.body.userId,
	});
	res.json(reaction);
};

// deletes a reaction
module.exports.removeReaction = async (req, res) => {
	await PostReaction.destroy({
		where: {
			reaction_id: req.params.reactionId,
		},
	});
	res.sendStatus(200);
};

// changes a already existing reaction to new type
module.exports.changeReaction = async (req, res) => {
	const updatedReaction = await PostReaction.findOne({
		where: {
			reaction_id: req.params.reactionId,
		},
	});
	updatedReaction.type = req.body.type;
	await updatedReaction.save();
	res.json(updatedReaction);
};

// --- COMMENTS -------------------------
// creates a new comment
module.exports.addComment = async (req, res) => {
	const comment = await Comment.create({
		text: req.body.text,
		post_id: req.params.postId,
		user_id: req.body.userId,
	});
	res.json(comment);
};

// fetches a comment, eager loaded with author and reactions.
module.exports.getComment = async (req, res) => {
	const comment = await Comment.findByPk(req.params.commentId, {
		include: [{ model: User }, { model: CommentReaction }],
	});
	res.json(comment);
};

// creates a new comment reaction
module.exports.addCommentReaction = async (req, res) => {
	const reaction = await CommentReaction.create({
		type: req.body.type,
		comment_id: req.body.commentId,
		user_id: req.body.userId,
	});
	res.json(reaction);
};

// deletes a comment reaction.
module.exports.removeCommentReaction = async (req, res) => {
	await CommentReaction.destroy({
		where: {
			reaction_id: req.params.reactionId,
		},
	});
	res.sendStatus(200);
};

// changes a already existing reaction to new type
module.exports.changeCommentReaction = async (req, res) => {
	const updatedReaction = await CommentReaction.findOne({
		where: {
			reaction_id: req.params.reactionId,
		},
	});
	updatedReaction.type = req.body.type;
	await updatedReaction.save();
	res.json(updatedReaction);
};
