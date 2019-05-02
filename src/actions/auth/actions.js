import * as ActionTypes from './constants';
import { AuthRequest } from '../../api';

export const register = data => dispatch => {
  dispatch({
    type: ActionTypes.REGISTER_PENDING,
  })

  return AuthRequest.register(data)
    .then((response) => {
      dispatch({
        type: ActionTypes.REGISTER_SUCCESS,
        payload: {
          token: response.key
        }
      })
    })
    .catch((error) => {
      dispatch({
        type: ActionTypes.REGISTER_FAIL,
        payload: {
          error
        }
      })
    })
}