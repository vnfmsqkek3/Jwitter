export default class AuthService {
  async login(username, password) {
    return {
      username: 'jae',
      token: 'abc1234',
    };
  }

  async me() {
    return {
      username: 'jae',
      token: 'abc1234',
    };
  }

  async logout() {
    return;
  }

  async signup(username, password, name, email, url) {
    return {
      username: 'jae',
      token: 'abc1234',
    };
  }
}
