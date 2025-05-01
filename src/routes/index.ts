import express from 'express';

const routes = express.Router();

import authRoutes from './authRoutes';
import courseRoutes from './courseRoutes';
import contentRoutes from './contentRoutes';
import userRoutes from './userRoutes';
import quizRoutes from './quizRoutes';

routes.use('/auth', authRoutes);
routes.use('/courses', courseRoutes);
routes.use('/contents', contentRoutes);
routes.use('/users', userRoutes);
routes.use('/quizzes', quizRoutes);

export default routes;