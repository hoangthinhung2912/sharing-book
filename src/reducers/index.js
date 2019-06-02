import { combineReducers } from 'redux';

import auth from './auth/store';
import post from './post/store';
import comment from './comment/store';

export default combineReducers({
  auth,
  post,
  comment
});