import { PrismaClient } from '@prisma/client';
const { FormatData } = require('../utils');

const prisma = new PrismaClient();

class ReportRepository {
  async GetTotalStudents() {
    try {
      const totalStudents = await prisma.student.count();
      return totalStudents;
    } catch (error) {
      FormatData(error);
    }
  }

  async GetTotalFees() {
    try {
      const fees = await prisma.feePayment.aggregate({
        _sum: {
          amount: true,
        },
      });
      return { totalFees: fees._sum.amount };
    } catch (error) {
      FormatData(error);
    }
  }

  async GetTotalStudentsByClass(id: number) {
    try {
      const totalStudents = await prisma.student.count({
        where: {
          classId: Number(id),
        },
      });
      return totalStudents;
    } catch (error) {
      FormatData(error);
    }
  }

  async GetTotalClasses() {
    try {
      const totalClasses = await prisma.class.count();
      return totalClasses;
    } catch (error) {
      FormatData(error);
    }
  }

  async GetTotalTeachers() {
    try {
      const totalTeachers = await prisma.teacher.count();
      return totalTeachers;
    } catch (error) {
      FormatData(error);
    }
  }

  async GetPaymentsModes() {
    try {
      const paymentModes = await prisma.feePayment.groupBy({
        by: ['payment_mode'],
        _count: true,
      });
      return paymentModes;
    } catch (error) {
      FormatData(error);
    }
  }
}

module.exports = ReportRepository;
