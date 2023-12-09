const { BackupRepository } = require('../repository');

class BackupService {
  private repository;

  constructor() {
    this.repository = new BackupRepository();
  }

  async Resetdatabase() {
    const user = await this.repository.Resetdatabase();
    return user;
  }

  async PartialResetdatabase() {
    const user = await this.repository.PartialResetdatabase();
    return user;
  }
}

module.exports = BackupService;
