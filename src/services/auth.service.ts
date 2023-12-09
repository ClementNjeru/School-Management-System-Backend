const { AuthRepository } = require('../repository');
// const { FormatData } = require('../utils');

class AuthService {
  private repository;

  constructor() {
    this.repository = new AuthRepository();
  }

  async Login(args: any) {
    const user = await this.repository.Login(args);
    return user;
  }

  async VerifyEmail(args: any) {
    const user = await this.repository.VerifyEmail(args);
    return user;
  }

  async ResetPassword(args: any) {
    const user = await this.repository.ResetPassword(args);
    return user;
  }
}

module.exports = AuthService;
