import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import app from './app/appReducers';
import user from './user/userReducers';

import articles from './article/articlesReducers';
import article from './article/articleReducers';

export default combineReducers({
  app,
  user,
  articles,
  article,
  form
});
