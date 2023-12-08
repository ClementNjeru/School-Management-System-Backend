const { TeacherRepository } = require('../repository');
const { FormatData } = require('../utils');
class TeacherService {
  private repository;

  constructor() {
    this.repository = new TeacherRepository();
  }

  async CreateTeacher(args: any) {
    const teacher = await this.repository.CreateTeacher(args);
    return FormatData(teacher);
  }

  async GetAllTeachers(args: { page: number; limit: number }) {
    const teachers = await this.repository.GetAllTeachers(args);
    return FormatData(teachers);
  }

  async GetTeacherById(id: number) {
    const teacher = await this.repository.GetTeacherById(id);
    return FormatData(teacher);
  }

  async UpdateTeacher(id: number, args: any) {
    const teacher = await this.repository.UpdateTeacher(id, args);
    return FormatData(teacher);
  }

  async DeleteTeacher(id: number) {
    const teacher = await this.repository.DeleteTeacher(id);
    return FormatData(teacher);
  }

  async SearchTeacherByName(args: {
    name: string;
    page: number;
    limit: number;
  }) {
    const teachers = await this.repository.SearchTeacherByName(args);
    return FormatData(teachers);
  }
}

module.exports = TeacherService;
