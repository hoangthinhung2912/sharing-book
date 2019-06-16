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

export const getListSharePost = (params) => (dispatch) => {
  dispatch({
    type: ActionTypes.GET_LIST_SHARE_POST_PENDING,
  });

  PostRequest.getListSharePost(params)
    .then((data) => {
      dispatch({
        type: ActionTypes.GET_LIST_SHARE_POST_SUCCESS,
        payload: {
          data
        }
      });
    })
    .catch((error) => {
      dispatch({
        type: ActionTypes.GET_LIST_SHARE_POST_FAIL,
        payload: {
          error
        }
      });
    });
};

export const getListShareRecommendsPost = (params) => (dispatch) => {
  dispatch({
    type: ActionTypes.GET_LIST_SHARE_RECOMMENDS_POST_PENDING,
  });

  PostRequest.getListShareRecommendsPost(params)
    .then((data) => {
      dispatch({
        type: ActionTypes.GET_LIST_SHARE__RECOMMENDS_POST_SUCCESS,
        payload: {
          ...data
        }
      });
    })
    .catch((error) => {
      dispatch({
        type: ActionTypes.GET_LIST_SHARE_RECOMMENDS_POST_FAIL,
        payload: {
          error
        }
      });
    });
};


export const getListReviewPost = (params) => (dispatch) => {
  dispatch({
    type: ActionTypes.GET_LIST_REVIEW_POST_PENDING,
  });

  PostRequest.getListReviewPost(params)
    .then((data) => {
      dispatch({
        type: ActionTypes.GET_LIST_REVIEW_POST_SUCCESS,
        payload: {
          data
        }
      });
    })
    .catch((error) => {
      dispatch({
        type: ActionTypes.GET_LIST_REVIEW_POST_FAIL,
        payload: {
          error
        }
      });
    });
};

export const getListDonatePost = (params) => (dispatch) => {
  dispatch({
    type: ActionTypes.GET_LIST_DONATE_POST_PENDING,
  });

  PostRequest.getListDonatePost(params)
    .then((data) => {
      dispatch({
        type: ActionTypes.GET_LIST_DONATE_POST_SUCCESS,
        payload: {
          data
        }
      });
    })
    .catch((error) => {
      dispatch({
        type: ActionTypes.GET_LIST_DONATE_POST_FAIL,
        payload: {
          error
        }
      });
    });
};

export const addPost = (data) => (dispatch) => {
  dispatch({
    type: ActionTypes.ADD_POST_PENDING,
  });

  PostRequest.addPost(data)
    .then((data) => {
      dispatch({
        type: ActionTypes.ADD_POST_SUCCESS,
        payload: {
          ...data,
          uniqueId: Math.random().toString(16)
        }
      });
    })
}

export const deletePost = (postType, postId) => (dispatch) => {
  // dispatch({
  //   type: ActionTypes.EDIT_COMMENT,
  //   payload: {
  //     ...data,
  //     postId
  //   }
  // });

  PostRequest.deletePost(postType, postId)
    .then((data) => {
      dispatch({
        type: ActionTypes.DELETE_POST,
        payload: {
          ...data,
          postId
        }
      });
    })
}

export const getCommentsByPostID = (postId) => (dispatch) => {
  dispatch({
    type: ActionTypes.GET_LIST_COMMENTS_PENDING,
  });

  PostRequest.getCommentsByPostID(postId)
    .then((data) => {
      dispatch({
        type: ActionTypes.GET_LIST_COMMENTS_SUCCESS,
        payload: {
          data
        }
      });
    })
    .catch((error) => {
      dispatch({
        type: ActionTypes.GET_LIST_COMMENTS_FAIL,
        payload: {
          error
        }
      });
    });
};

export const addComment = (postId, data) => (dispatch, getState) => {
  dispatch({
    type: ActionTypes.ADD_COMMENT_PENDING,
  });

  // dispatch({
  //   type: ActionTypes.ADD_COMMENT_SUCCESS,
  //   payload: {
  //     ...data,
  //     user_avatar: getState().auth.userInfo.user_avatar,
  //     user_id: getState().auth.userInfo.user_id,
  //     user_name: getState().auth.userInfo.user_name,
  //     postId,
  //     uniqueId: Math.random().toString(16)
  //   }
  // });

  PostRequest.addComment(postId, data)
    .then((data) => {
      dispatch({
        type: ActionTypes.ADD_COMMENT_SUCCESS,
        payload: {
          ...data,
          postId,
          uniqueId: Math.random().toString(16)
        }
      });
    })
}

export const editPost = (postId, data) => (dispatch) => {
  // dispatch({
  //   type: ActionTypes.EDIT_COMMENT,
  //   payload: {
  //     ...data,
  //     postId
  //   }
  // });

  PostRequest.editPost(postId, data)
    .then((data) => {
      dispatch({
        type: ActionTypes.EDIT_POST,
        payload: {
          ...data,
          postId
        }
      });
    })
}


export const editComment = (postId, commentId, data) => (dispatch) => {
  // dispatch({
  //   type: ActionTypes.EDIT_COMMENT,
  //   payload: {
  //     ...data,
  //     postId
  //   }
  // });

  PostRequest.editComment(postId, commentId, data)
    .then((data) => {
      dispatch({
        type: ActionTypes.EDIT_COMMENT,
        payload: {
          ...data,
          postId
        }
      });
    })
}

export const deleteComment = (postId, commentId) => (dispatch) => {
  // dispatch({
  //   type: ActionTypes.EDIT_COMMENT,
  //   payload: {
  //     ...data,
  //     postId
  //   }
  // });

  PostRequest.deleteComment(postId, commentId)
    .then((data) => {
      dispatch({
        type: ActionTypes.DELETE_COMMENT,
        payload: {
          ...data,
          postId,
          commentId
        }
      });
    })
}

export const likePost = (postId) => (dispatch) => {
  // dispatch({
  //   type: ActionTypes.EDIT_COMMENT,
  //   payload: {
  //     ...data,
  //     postId
  //   }
  // });

  PostRequest.likePost(postId)
    .then((data) => {
      dispatch({
        type: ActionTypes.LIKE_POST,
        payload: {
          ...data,
          postId
        }
      });
    })
}

export const searchPost = (postType, data) => (dispatch) => {
  // dispatch({
  //   type: ActionTypes.EDIT_COMMENT,
  //   payload: {
  //     ...data,
  //     postId
  //   }
  // });

  PostRequest.searchPost(postType, data)
    .then((response) => {
      dispatch({
        type: ActionTypes.SEARCH_POST,
        payload: {
          ...response
        }
      });
    })
}

export const searchWithPostType = (postType, data) => (dispatch) => {
  // dispatch({
  //   type: ActionTypes.EDIT_COMMENT,
  //   payload: {
  //     ...data,
  //     postId
  //   }
  // });

  PostRequest.searchWithTypePost(postType, data)
    .then((response) => {
      dispatch({
        type: ActionTypes.SEARCH_WITH_POST_TYPE,
        payload: {
          ...response
        }
      });
    })
}

export const changePostType = (postType) => {
  return {
    type: ActionTypes.CHANGE_POST_TYPE,
    payload: {
      postType
    }
  }
}

export const getListDonation = (params) => (dispatch) => {
  dispatch({
    type: ActionTypes.GET_LIST_DONATION_PENDING,
  });

  PostRequest.getListDonation(params)
    .then((data) => {
      dispatch({
        type: ActionTypes.GET_LIST_DONATION_SUCCESS,
        payload: {
          data
        }
      });
    })
    .catch((error) => {
      dispatch({
        type: ActionTypes.GET_LIST_DONATION_FAIL,
        payload: {
          error
        }
      });
    });
};

export const registerBook = (params) => (dispatch) => {
  PostRequest.registerBook(params)
    .then((data) => {
      dispatch({
        type: ActionTypes.REGISTER_BOOK,
        payload: {
          data
        }
      });
    })
};

export const recommendBook = (params) => (dispatch) => {
  PostRequest.recommendBook(params)
    .then((data) => {
      dispatch({
        type: ActionTypes.RECOMMEND_BOOK,
        payload: {
          data
        }
      });
    })
};
