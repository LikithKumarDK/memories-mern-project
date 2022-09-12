import express from 'express';
import usersRoutes from './users.routes.js';
import postsRoutes from './posts.routes.js';

const router = express.Router();

// Dashboard
router.get('/', (req, res) => {
	res.send('Hello to Memories API')
});

// User
router.use('/users', usersRoutes);

// Post
router.use('/posts', postsRoutes);

export default router;