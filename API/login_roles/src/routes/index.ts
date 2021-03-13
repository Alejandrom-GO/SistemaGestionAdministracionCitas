import { Router } from 'express';

import auth from './auth';
import date from './date'
import user from './user';



const routes = Router();

routes.use('/auth', auth);

routes.use('/api', date)

routes.use('/users', user);


export default routes;
