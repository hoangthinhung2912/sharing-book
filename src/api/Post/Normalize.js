import { head, path } from 'ramda';
import { mapById, mapByProp } from '../../utils/common';

const PostNormalize = {
  getListPost(response) {
    return {
      byId: mapById(response),
      allIds: response.map(item => item.id)
    };
  },

  getListDonation(response) {
    return {
      donations: response.map(item => item)
    };
  },


  getCommentsByPostID(response) {
    return {
      [path(['post_id'], head(response))]: response.map(item => ({
        ...item,
        uniqueId: Math.random().toString(16),
      }))
    }
  },

  searchPost(response) {
    return {
      byId: mapById(response),
      searchPhase: response.map(item => item.id)
    };
  },

  recommendPost(response) {
    return {
      byId: mapById(response),
      recommends: response.map(item => item.id)
    };
  },
};

export default PostNormalize;