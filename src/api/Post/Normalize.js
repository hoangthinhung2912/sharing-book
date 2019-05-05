import { mapById } from '../../utils/common';

const PostNormalize = {
  getListPost(response) {
    return {
      byId: mapById(response),
      allIds: response.map(item => item.id)
    };
  }
};

export default PostNormalize;