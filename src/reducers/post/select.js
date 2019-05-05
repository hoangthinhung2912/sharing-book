import { compose } from 'ramda';

export const getPostState = state => state.post;

export const getListPost = compose(
  postState => postState.allIds.map(id => postState.byId[id]),
  getPostState,
);

export const getPostAppState = compose(
  postState => postState.appState,
  getPostState,
);