const router = require('express').Router();
const controller = require('../controllers/user.controller');

// Routing all users
router
	.route('/')
	.get(controller.getAllUsers)
	.post(controller.createUser);

// Routing individual user
router
	.route('/:userId')
	.get(controller.getUser)
	.put(controller.updateUser)
	.delete(controller.removeUser);

router.post('/login', controller.login);

// Routing followed users
router.post('/follow/:followedId', controller.updateFollowStatus);

module.exports = router;
