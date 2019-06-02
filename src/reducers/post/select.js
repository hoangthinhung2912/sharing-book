import { compose } from 'ramda';

export const getPostState = state => state.post;

export const getListPost = compose(
  postState => postState.searchPhase.map(id => postState.byId[id]),
  getPostState,
);

export const getPostAppState = compose(
  postState => postState.appState,
  getPostState,
);

export const getPostType = compose(
  postAppState => postAppState.post_type,
  getPostAppState
);

export const getIsProfilePage = compose(
  postAppState => postAppState.is_profile_page,
  getPostAppState
);

export const getListRecommend = compose(
  postState => postState.recommends.map(id => postState.byId[id]),
  getPostState,
);

export const getListDonation = compose(
  postState => postState.donations,
  getPostState,
);