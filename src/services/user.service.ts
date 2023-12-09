const { UserRepository } = require('../repository');

class UserService {
  private repository;

  constructor() {
    this.repository = new UserRepository();
  }

  async CreateUser(args: any) {
    const user = await this.repository.CreateUser(args);
    return user;
  }

  async GetAllUsers(args: { page: number; limit: number }) {
    const users = await this.repository.GetAllUsers(args);
    return users;
  }

  async GetUserById(id: number) {
    const user = await this.repository.GetUserById(id);
    return user;
  }

  async UpdateUser(id: number, args: any) {
    const user = await this.repository.UpdateUser(id, args);
    return user;
  }

  async DeleteUser(id: number) {
    const user = await this.repository.DeleteUser(id);
    return user;
  }

  async SearchUserByName(args: { name: string; page: number; limit: number }) {
    const users = await this.repository.SearchUserByName(args);
    return users;
  }
}

module.exports = UserService;
