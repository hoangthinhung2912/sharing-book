import * as ActionTypes from './constants';
import Cookies from 'universal-cookie';
import { AuthRequest } from '../../api';

const cookies = new Cookies();

export const getProfile = () => dispatch => {
  return AuthRequest.getProfile()
    .then((data) => {
      dispatch({
        type: ActionTypes.GET_PROFILE,
        payload: data
      });
    });
  }

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
      dispatch(getProfile());
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

export const logout = () => dispatch => {
  dispatch({
    type: ActionTypes.LOGOUT_PENDING,
  });

  return AuthRequest.logout()
    .then((response) => {
      dispatch({
        type: ActionTypes.LOGOUT_SUCCESS,
      })
      dispatch(getProfile());
    })
    .catch((error) => {
      dispatch({
        type: ActionTypes.LOGOUT_FAIL,
        payload: {
          error
        }
      });
    });
};

export const editUser = (data) => (dispatch) => {
  AuthRequest.editUser(data)
    .then((data) => {
      dispatch({
        type: ActionTypes.EDIT_USER,
        payload: {
          data
        }
      });
    })
}

export const changePassword = (data) => (dispatch) => {
  AuthRequest.changePassword(data)
    .then((data) => {
      dispatch({
        type: ActionTypes.CHANGE_PASSWORD,
        payload: {
          data
        }
      });
    })
}

export const getNotifications = () => (dispatch) => {
  AuthRequest.getNotifications()
    .then((data) => {
      dispatch({
        type: ActionTypes.GET_NOTIFICATIONS,
        payload: {
          data
        }
      });
    })
}

export const seenNotifications = (data) => (dispatch) => {
  AuthRequest.seenNotifications(data)
    .then((response) => {
      dispatch({
        type: ActionTypes.SEEN_NOTIFICATIONS,
        payload: {
          response
        }
      });
    })
}

export const editProfile = (id, data) => (dispatch) => {
  AuthRequest.editProfile(id, data)
    .then((data) => {
      dispatch({
        type: ActionTypes.EDIT_PROFILE,
        payload: {
          data
        }
      });
    })
}
