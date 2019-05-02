import Request from '../Request';

const AuthRequest = {
  register(data) {
    return Request().post('/rest-auth/registration/', data);
  }
}

export default AuthRequest;