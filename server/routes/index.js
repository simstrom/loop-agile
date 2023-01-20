const router = require('express').Router();
const userRoutes = require('./user.routes');
const postRoutes = require('./post.routes');

router.use('/api/users', userRoutes);
router.use('/api/posts', postRoutes);

module.exports = router;
