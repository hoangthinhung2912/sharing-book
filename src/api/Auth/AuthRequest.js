import Request from '../Request';
import Normalize from './Normalize';

const AuthRequest = {
  register(data) {
    return Request().post('/rest-auth/registration/', data);
  },

  login(data) {
    return Request().post('/rest-auth/login/', data);
  },

  logout() {
    return Request().post('/rest-auth/logout/');
  },

  getProfile() {
    return Request().get('/api/v1/accounts/profiles/').then(Normalize.getProfile);
  },

  editUser(data) {
    return Request().put('/rest-auth/user/', data);
  },

  changePassword(data) {
    return Request().post('/rest-auth/password/change/', data);
  },
};

export default AuthRequest;