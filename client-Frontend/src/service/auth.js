export default class AuthService {
  async login(username, password) {
    return {
      username: 'jaehyeok',
      token: '1234',
    };
  }

  async me() {
    return {
      username: 'ellie',
      token: 'abc1234',
    };
  }

  async logout() {
    return;
  }

  async signup(username, password, name, email, url) {
    return {
      username: 'ellie',
      token: 'abc1234',
    };
  }
}
