const argon2 = require('argon2');
const { Post, Comment, PostReaction, User, FollowedUser } = require('../models');

// Returns all users in db.
module.exports.getAllUsers = async (req, res) => {
	const users = await User.findAll();
	res.json(users);
};

// Authenticates a single user.
module.exports.login = async (req, res) => {
	const user = await User.findOne({
		where: { email: req.body.email },
	});

	// Guard to check if login is invalid
	if (!user || !(await argon2.verify(user.password, req.body.password))) {
		res.sendStatus(400);
	} else {
		res.json(user);
	}
};

// 	Creates a new user in db.
module.exports.createUser = async (req, res) => {
	try {
		const user = await User.create({ ...req.body });
		res.json(user);
	} catch (err) {
		// Catches if user already exists
		res.status(400).json(err.message);
	}
};

// 	Returns a single user from db.
// Eager loaded with posts created its comment, reaction and followers/following.
module.exports.getUser = async (req, res) => {
	const user = await User.findByPk(req.params.userId, {
		include: [
			{
				model: Post,
				include: User,
			},
			{
				model: Post,
				include: Comment,
			},
			{
				model: Post,
				include: PostReaction,
			},
			{
				model: User,
				as: 'following',
			},
			{
				model: User,
				as: 'followers',
			},
		],
	});
	res.json(user);
};

// 	updates user information in db.
module.exports.updateUser = async (req, res) => {
	try {
		let user = await User.findOne({
			where: {
				user_id: req.params.userId,
			},
		});
		user.first_name = req.body.first_name;
		user.last_name = req.body.last_name;
		user.email = req.body.email;

		await user.save();
		res.json(user);
	} catch (err) {
		// Catches if email already exists
		res.status(400).json(err.message);
	}
};

// 	deletes a user from db.
module.exports.removeUser = async (req, res) => {
	const user = await User.findOne({
		where: {
			user_id: req.params.userId,
		},
	});
	await user.destroy();
	res.sendStatus(200);
};

// 	toggles following relation between two users.
module.exports.updateFollowStatus = async (req, res) => {
	const { followedId } = req.params;
	const { user_id } = req.body;
	followedId === user_id && res.sendStatus(400);

	// Check for exisitng follow relationship
	const isFollowing = await FollowedUser.findOne({
		where: {
			user_id: user_id,
			followed_id: followedId,
		},
	});

	// Toggle of follow status depending on current relation.
	if (!isFollowing) {
		await FollowedUser.create({
			user_id: user_id,
			followed_id: followedId,
		});
		res.json({ message: 'Started following user.' });
	} else {
		await FollowedUser.destroy({
			where: {
				user_id,
				followed_id: followedId,
			},
		});
		res.json({ message: 'Unfollowed user.' });
	}
};
