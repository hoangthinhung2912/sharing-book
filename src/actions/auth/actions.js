import * as ActionTypes from './constants';
import Cookies from 'universal-cookie';
import { AuthRequest } from '../../api';

const cookies = new Cookies();

export const register = data => dispatch => {
  dispatch({
    type: ActionTypes.REGISTER_PENDING,
  });

  return AuthRequest.register(data)
    .then((response) => {
      dispatch({
        type: ActionTypes.REGISTER_SUCCESS,
        payload: {
          token: response.key
        }
      });
    })
    .catch((error) => {
      dispatch({
        type: ActionTypes.REGISTER_FAIL,
        payload: {
          error
        }
      });
    });
};

export const login = data => dispatch => {
  dispatch({
    type: ActionTypes.LOGIN_PENDING,
  });

  return AuthRequest.login({
    ...data,
    csrfmiddlewaretoken: cookies.get('csrftoken')
  })
    .then((response) => {
      dispatch({
        type: ActionTypes.LOGIN_SUCCESS,
        payload: {
          token: response.key
        }
      })
    })
    .catch((error) => {
      dispatch({
        type: ActionTypes.LOGIN_FAIL,
        payload: {
          error
        }
      });
    });
};