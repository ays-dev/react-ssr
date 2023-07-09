import { Router } from 'express';

import auth from './auth';
import articles from './articles';
import users from './users';

const ajaxMiddleware = Router();

ajaxMiddleware.use([
  auth,
  articles,
  users
]);

export default ajaxMiddleware;
