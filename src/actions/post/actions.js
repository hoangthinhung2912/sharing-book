import * as ActionTypes from './constants';
import { PostRequest } from '../../api';

export const getListPost = (params) => (dispatch) => {
  dispatch({
    type: ActionTypes.GET_LIST_POST_PENDING,
  });

  PostRequest.getListPost(params)
    .then((data) => {
      dispatch({
        type: ActionTypes.GET_LIST_POST_SUCCESS,
        payload: {
          data
        }
      });
    })
    .catch((error) => {
      dispatch({
        type: ActionTypes.GET_LIST_POST_FAIL,
        payload: {
          error
        }
      });
    });
};