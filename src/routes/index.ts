import express from 'express';

const routes = express.Router();

import userRoutes from './userRoutes';
import authRoutes from './authRoutes';

routes.use('/users', userRoutes);
routes.use('/auth', authRoutes);

export default routes;