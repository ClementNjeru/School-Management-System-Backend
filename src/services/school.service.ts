const { SchoolRepository } = require('../repository');

class SchoolService {
  private repository;

  constructor() {
    this.repository = new SchoolRepository();
  }

  async CreateSchool(args: any) {
    const School = await this.repository.CreateSchool(args);
    return School;
  }

  async GetAllSchools(args: { page: number; limit: number }) {
    const Schools = await this.repository.GetAllSchools(args);
    return Schools;
  }

  async GetSchoolById(id: number) {
    const School = await this.repository.GetSchoolById(id);
    return School;
  }

  async UpdateSchool(id: number, args: any) {
    const School = await this.repository.UpdateSchool(id, args);
    return School;
  }
}

module.exports = SchoolService;
