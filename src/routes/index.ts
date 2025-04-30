import express from 'express';

const routes = express.Router();

import userRoutes from './userRoutes';
import authRoutes from './authRoutes';
import courseRoutes from './courseRoutes';

routes.use('/users', userRoutes);
routes.use('/courses', courseRoutes);
routes.use('/auth', authRoutes);

export default routes;