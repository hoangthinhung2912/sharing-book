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

  getNotifications() {
    return Request().get('/api/v1/posts/notifications/');
  },

  seenNotifications(data) {
    return Request().put('/api/v1/posts/notifications/' + data + '/');
  },

  editProfile(id, data) {
    return Request().putFormData('/api/v1/accounts/profiles/' + id + '/', data);
  },
};

export default AuthRequest;