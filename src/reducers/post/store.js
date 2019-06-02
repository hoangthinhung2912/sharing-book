import { PostTypes } from '../../actions';
import { omit } from 'ramda';

const INIT_STATE = {
  byId: {},
  searchPhase: [],
  allIds: [],
  recommends: [],
  donations: [],
  appState: {
    loading: false,
    error: null,
    post_type: null
  }
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case PostTypes.GET_LIST_POST_PENDING:
    case PostTypes.GET_LIST_SHARE_POST_PENDING:
    case PostTypes.GET_LIST_REVIEW_POST_PENDING:
    case PostTypes.GET_LIST_DONATE_POST_PENDING:
    case PostTypes.GET_LIST_DONATION_PENDING:
      return {
        ...INIT_STATE,
        appState: {
          ...state.appState,
          loading: true,
          error: null,
        }
      };

    case PostTypes.GET_LIST_POST_SUCCESS:
    case PostTypes.GET_LIST_SHARE_POST_SUCCESS:
    case PostTypes.GET_LIST_REVIEW_POST_SUCCESS:
    case PostTypes.GET_LIST_DONATE_POST_SUCCESS:
      return {
        ...state,
        allIds: [...state.allIds, ...action.payload.data.allIds],
        byId: {
          ...state.byId,
          ...action.payload.data.byId,
        },
        searchPhase: action.payload.data.allIds,
        appState: {
          ...state.appState,
          loading: false,
          error: null,
        }
      };
    
    case PostTypes.GET_LIST_SHARE__RECOMMENDS_POST_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId,
          ...action.payload.byId,
        },
        recommends: action.payload.recommends
      }

    case PostTypes.GET_LIST_DONATION_SUCCESS:
        return {
          ...state,
          donations: action.payload.data
        }

    case PostTypes.GET_LIST_POST_FAIL:
    case PostTypes.GET_LIST_SHARE_POST_FAIL:
    case PostTypes.GET_LIST_REVIEW_POST_FAIL:
    case PostTypes.GET_LIST_DONATE_POST_FAIL:
    case PostTypes.GET_LIST_DONATION_FAIL:
      return {
        ...state,
        appState: {
          ...state.appState,
          loading: false,
          error: action.payload.error
        }
      };
    
    case PostTypes.ADD_POST_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: {
            ...
            action.payload
          }
        },
        searchPhase: [
          action.payload.id,
          ...state.allIds,
        ],
        allIds: [
          action.payload.id,
          ...state.allIds,
        ]
      }
    
    case PostTypes.EDIT_POST:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: {
            ...
            action.payload
          }
        }
      }

    case PostTypes.DELETE_POST:
      return {
        ...state,
        byId: omit([action.payload.postId], state.byId),
        searchPhase: state.searchPhase.filter(id => id !== action.payload.postId),
        allIds: state.allIds.filter(id => id !== action.payload.postId),
        recommends: state.recommends.filter(id => id !== action.payload.postId),
      }
    
    
    case PostTypes.LIKE_POST:
      let like_num = state.byId[action.payload.postId].likes;
      if (state.byId[action.payload.postId].is_like_own) {
        like_num -= 1;
      } else {
        like_num += 1;
      }
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.postId]: {
            ...state.byId[action.payload.postId],
            likes: like_num,
            is_like_own: !state.byId[action.payload.postId].is_like_own
          }
        }
      }

      case PostTypes.SEARCH_POST:
        return {
          ...state,
          byId: {
            ...state.byId,
            ...action.payload.byId,
          },
          searchPhase: action.payload.searchPhase
        }

      case PostTypes.SEARCH_WITH_POST_TYPE:
        return {
          ...state,
          byId: {
            ...state.byId,
            ...action.payload.byId,
          },
          searchPhase: action.payload.searchPhase
        }

      case PostTypes.CHANGE_POST_TYPE:
        return {
          ...state,
          appState: {
            ...state.appState,
            post_type: action.payload.postType
          }
        }

    default:
      return state;
  }
};
