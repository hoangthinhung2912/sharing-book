import { combineReducers } from 'redux';

import auth from './auth/store';
import post from './post/store';

export default combineReducers({
  auth,
  post
});