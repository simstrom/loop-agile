const router = require('express').Router();
const controller = require('../controllers/post.controller');

// Routing all posts
router.route('/').get(controller.getAllPosts).post(controller.createPost);

// Routing individual posts
router
	.route('/:postId')
	.get(controller.getPost)
	.put(controller.updatePost)
	.delete(controller.removePost);

// Routing post reactions
router.post('/:postId/reactions', controller.addReaction);
router
	.route('/:postId/reactions/:reactionId')
	.put(controller.changeReaction)
	.delete(controller.removeReaction);

// Routing post comments
router.post('/:postId/comments', controller.addComment);
router.get('/:postId/comments/:commentId', controller.getComment);

// Routing comment reactions
router.post('/comments/:commentId/reactions', controller.addCommentReaction);
router
	.route('/comments/:commentId/reactions/:reactionId')
	.put(controller.changeCommentReaction)
	.delete(controller.removeCommentReaction);

module.exports = router;
