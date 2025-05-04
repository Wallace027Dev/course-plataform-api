import express from 'express';

const routes = express.Router();

import authRoutes from './authRoutes';
import courseRoutes from './courseRoutes';
import contentRoutes from './contentRoutes';
import userRoutes from './userRoutes';
import quizRoutes from './quizRoutes';
import answerRoutes from './answerRoutes';
import attemptRoutes from './attemptRoutes';
import journeyRoutes from './journeyRoutes';
import questionRoutes from './questionRoutes';
import resultRoutes from './ResultRoutes';
import userCourseRoutes from './userCourseRoutes';

routes.use('/answers', answerRoutes);
routes.use('/attempts', attemptRoutes);
routes.use('/auth', authRoutes);
routes.use('/contents', contentRoutes);
routes.use('/courses', courseRoutes);
routes.use('/journeys', journeyRoutes);
routes.use('/questions', questionRoutes);
routes.use('/quizzes', quizRoutes);
routes.use('/results', resultRoutes);
routes.use('/register', userCourseRoutes);
routes.use('/users', userRoutes);

export default routes;