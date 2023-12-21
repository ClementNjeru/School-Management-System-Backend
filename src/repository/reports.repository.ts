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

  async GetTodaysSales() {
    try {
      const today = new Date();
      // CHANGE THIS
      const startOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );
      const endOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 1
      );

      const paymentModes = [
        'BANK',
        'MPESA',
        'CHEQUE',
        'CREDIT',
        'CASH',
        'CARD',
      ];

      const revenueByPaymentMode = await Promise.all(
        paymentModes.map(async (mode) => {
          const revenue = await prisma.feePayment.aggregate({
            where: {
              payment_mode: mode,
              createdAt: {
                gte: startOfDay,
                lt: endOfDay,
              },
            },
            _sum: {
              amount: true,
            },
          });

          return {
            name: mode,
            value: Number(revenue._sum?.amount) ?? 0,
          };
        })
      );

      return {
        todayRevenueByPaymentMode: revenueByPaymentMode,
      };
    } catch (error) {
      FormatData(error);
    }
  }

  async GetClassPaymentReport(classId: number) {
    try {
      // Students who have paid full fee
      const paidStudentsCount = await prisma.student.count({
        where: {
          classId: classId,
          feeBalance: {
            equals: 0,
          },
        },
      });

      // Students who have not made any payment
      const unpaidStudentsCount = await prisma.student.count({
        where: {
          classId: classId,
          feePaid: {
            equals: 0,
          },
        },
      });

      // Students who have made some payment but not fully paid
      const partialPaidStudentsCount = await prisma.student.count({
        where: {
          classId: classId,
          feePaid: {
            gt: 0,
          },
          feeBalance: {
            gt: 0,
          },
        },
      });

      return [
        { name: 'paid', value: paidStudentsCount },
        { name: 'unpaid', value: unpaidStudentsCount },
        { name: 'partial', value: partialPaidStudentsCount },
      ];
    } catch (error) {
      FormatData(error);
    }
  }
}

module.exports = ReportRepository;
