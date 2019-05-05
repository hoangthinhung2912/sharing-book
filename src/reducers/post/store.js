import { PostTypes } from '../../actions';

const INIT_STATE = {
  byId: {},
  allIds: [],
  appState: {
    loading: false,
    error: null,
  }
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case PostTypes.GET_LIST_POST_PENDING:
      return {
        ...INIT_STATE,
        appState: {
          loading: true,
          error: null,
        }
      };

    case PostTypes.GET_LIST_POST_SUCCESS:
      return {
        ...state,
        ...action.payload.data,
        appState: {
          loading: false,
          error: null,
        }
      };

    case PostTypes.GET_LIST_POST_FAIL:
      return {
        ...state,
        appState: {
          loading: false,
          error: action.payload.error
        }
      };

    default:
      return state;
  }
};
