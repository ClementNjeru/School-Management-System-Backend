const { ClassRepository } = require('../repository');

class ClassService {
  private repository;

  constructor() {
    this.repository = new ClassRepository();
  }

  async CreateClass(args: any) {
    const Class = await this.repository.CreateClass(args);
    return Class;
  }

  async GetAllClasses(args: { page: number; limit: number }) {
    const Classes = await this.repository.GetAllClasses(args);
    return Classes;
  }

  async GetClassById(id: number) {
    const Class = await this.repository.GetClassById(id);
    return Class;
  }

  async UpdateClass(id: number, args: any) {
    const Class = await this.repository.UpdateClass(id, args);
    return Class;
  }

  async DeleteClass(id: number) {
    const Class = await this.repository.DeleteClass(id);
    return Class;
  }

  async SearchClassByName(args: { name: string; page: number; limit: number }) {
    const Classes = await this.repository.SearchClassByName(args);
    return Classes;
  }
}

module.exports = ClassService;
