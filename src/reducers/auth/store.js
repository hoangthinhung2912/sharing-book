import { AuthTypes } from '../../actions';

const INIT_STATE = {
  token: null,
  userInfo: null,
  notifications: [],
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

    case AuthTypes.GET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload.data
      }
  
    case AuthTypes.SEEN_NOTIFICATIONS:
      return {
        ...state,
        notifications: state.notifications.map(item => 
          item.id === action.payload.response ? item.seen=true: item
        )
      }
    
    case AuthTypes.EDIT_PROFILE:
      return {
        ...state,
        userInfo: action.payload.data
      }
    
    case AuthTypes.EDIT_USER:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          user_name: action.payload.data.username
        }
      }

    case AuthTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        token: null,
        userInfo: null,
        appState: {
          ...state.appState,
          isLogged: false,
        }
      }
    default:
      return state;
  }
};
