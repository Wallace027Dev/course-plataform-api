import express from 'express';

const routes = express.Router();

import authRoutes from './authRoutes';
import courseRoutes from './courseRoutes';
import contentRoutes from './contentRoutes';
import userRoutes from './userRoutes';

routes.use('/auth', authRoutes);
routes.use('/courses', courseRoutes);
routes.use('/contents', contentRoutes);
routes.use('/users', userRoutes);

export default routes;