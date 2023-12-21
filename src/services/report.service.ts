const { ReportRepository } = require('../repository');

class ReportService {
  private repository;

  constructor() {
    this.repository = new ReportRepository();
  }

  async GetTotalStudent() {
    const totalStudent = await this.repository.GetTotalStudent();
    return totalStudent;
  }

  async GetTotalTeacher() {
    const totalTeacher = await this.repository.GetTotalTeacher();
    return totalTeacher;
  }

  async GetTotalClass() {
    const totalClass = await this.repository.GetTotalClass();
    return totalClass;
  }

  async GetTotalFees() {
    const totalFees = await this.repository.GetTotalFees();
    return totalFees;
  }

  async GetTotalStudentByClass() {
    const totalStudentByClass = await this.repository.GetTotalStudentByClass();
    return totalStudentByClass;
  }

  async GetPaymentModes() {
    const paymentModes = await this.repository.GetpaymentModes();
    return paymentModes;
  }

  async GetTodaysSales() {
    const revenue = await this.repository.GetTodaysSales();
    return revenue;
  }

  async GetClassPaymentReport(classId: number) {
    const revenue = await this.repository.GetClassPaymentReport(classId);
    return revenue;
  }
}

module.exports = ReportService;
