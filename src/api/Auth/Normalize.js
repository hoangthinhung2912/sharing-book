import { head, path } from 'ramda';
import { mapById, mapByProp } from '../../utils/common';

const AuthNormalize = {
  getProfile(response) {
    return {
      userInfo: head(response),
    };
  }
};

export default AuthNormalize;