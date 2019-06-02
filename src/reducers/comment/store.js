import { PostTypes } from '../../actions';

const INIT_STATE = {
  byPostId: {},
  appState: {
    loading: false,
    error: null,
  }
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // case PostTypes.GET_LIST_POST_PENDING:
    //   return {
    //     ...INIT_STATE,
    //     appState: {
    //       loading: true,
    //       error: null,
    //     }
    //   };

    case PostTypes.GET_LIST_COMMENTS_SUCCESS:
      return {
        ...state,
        byPostId: {
          ...state.byPostId,
          ...action.payload.data,
        },
        appState: {
          loading: false,
          error: null,
        }
      };

    case PostTypes.ADD_COMMENT_SUCCESS:
      return {
        ...state,
        byPostId: {
          ...state.byPostId,
          [action.payload.postId]: [
            ...(state.byPostId[action.payload.postId] || []),
            action.payload
          ]
        }
      }
    
    case PostTypes.EDIT_COMMENT:
    return {
      ...state,
      byPostId: {
        ...state.byPostId,
        [action.payload.postId]: state.byPostId[action.payload.postId]
          .map(comment => comment.id === action.payload.id ? action.payload : comment)
      }
    }

    case PostTypes.DELETE_COMMENT:
    return {
      ...state,
      byPostId: {
        ...state.byPostId,
        [action.payload.postId]: state.byPostId[action.payload.postId]
          .filter(comment => comment.id !== action.payload.commentId)
      }
    }

    // case PostTypes.GET_LIST_POST_FAIL:
    //   return {
    //     ...state,
    //     appState: {
    //       loading: false,
    //       error: action.payload.error
    //     }
    //   };

    default:
      return state;
  }
};
