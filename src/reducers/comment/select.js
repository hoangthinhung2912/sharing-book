import { compose } from 'ramda';

export const getCommentState = state => state.comment;

export const getCommentByPostId = (postId) => compose(
    commentState => commentState.byPostId[postId],
    getCommentState
);