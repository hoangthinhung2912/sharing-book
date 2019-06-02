import { AuthTypes } from '../../actions';

const INIT_STATE = {
  token: null,
  userInfo: null,
  appState: {
    isLogged: false,
    loading: false,
    error: null,
  }
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case AuthTypes.REGISTER_PENDING:
    case AuthTypes.LOGIN_PENDING:
      return {
        ...state,
        appState: {
          ...state.appState,
          loading: true,
          error: null,
        }
      };

    case AuthTypes.REGISTER_SUCCESS:
    case AuthTypes.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        appState: {
          isLogged: true,
          loading: false,
          error: null,
        }
      };

    case AuthTypes.REGISTER_FAIL:
    case AuthTypes.LOGIN_FAIL:
      return {
        ...state,
        appState: {
          ...state.appState,
          loading: false,
          error: action.payload.error
        }
      };
    
    case AuthTypes.GET_PROFILE:
      return {
        ...state,
        userInfo: action.payload.userInfo
      }

    default:
      return state;
  }
};
