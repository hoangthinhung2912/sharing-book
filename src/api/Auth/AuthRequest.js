import Request from '../Request';

const AuthRequest = {
  register(data) {
    return Request().post('/rest-auth/registration/', data);
  },

  login(data) {
    return Request().post('/rest-auth/login/', data);
  }
};

export default AuthRequest;