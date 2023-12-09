import { PrismaClient } from '@prisma/client';
const { FormatData } = require('../utils');

const prisma = new PrismaClient();

class FeeRepository {
  async CreateFee(args: any) {
    try {
      const { studentId, amount } = args;

      // Retrieve the student
      const student = await prisma.student.findUnique({
        where: { id: studentId },
      });

      // Ensure the student exists
      if (!student) {
        throw new Error('Student not found');
      }

      // Execute the transaction
      const [studentInfo, paymentInfo] = await prisma.$transaction([
        // Create the new fee payment
        prisma.feePayment.create({ data: args }), // Update the student's feePaid and feeBalance
        prisma.student.update({
          where: { id: studentId },
          data: {
            feePaid: {
              increment: amount,
            },
            feeBalance: {
              decrement: amount,
            },
          },
        }),
      ]);

      return paymentInfo;
    } catch (error) {
      FormatData(error);
    }
  }

  async GetAllFees(args: { page: number; limit: number }) {
    try {
      const { page, limit } = args;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const fees = await prisma.feePayment.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        skip: startIndex,
        take: limit,
      });

      const totalItems = await prisma.feePayment.count();
      return {
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        itemsPerPage: limit,
        totalItems: totalItems,
        items: fees.slice(0, endIndex),
      };
    } catch (error) {
      FormatData(error);
    }
  }

  async GetFeeById(id: number) {
    try {
      const fee = await prisma.feePayment.findUnique({
        where: {
          id,
        },
      });
      if (!fee) {
        throw new Error('Fee not found');
      }
      return fee;
    } catch (error) {
      FormatData(error);
    }
  }

  async UpdateFee(id: number, args: any) {
    try {
      const { studentId, amount } = args;

      // Retrieve the original fee payment
      const originalFeePayment = await prisma.feePayment.findUnique({
        where: { id: Number(id) },
      });

      if (!originalFeePayment) {
        throw new Error('Fee payment not found');
      }

      // Calculate the difference between the new amount and the original one
      const amountDifference =
        Number(amount) - Number(originalFeePayment.amount);

      const [studentInfo, paymentInfo] = await prisma.$transaction([
        // Update the fee payment
        prisma.feePayment.update({
          where: { id: Number(id) },
          data: args,
        }),
        // Update the student's feePaid and feeBalance
        prisma.student.update({
          where: { id: studentId },
          data: {
            feePaid: {
              increment: amountDifference,
            },
            feeBalance: {
              decrement: amountDifference,
            },
          },
        }),
      ]);

      return paymentInfo;
    } catch (error) {
      FormatData(error);
    }
  }

  async DeleteFee(id: number) {
    try {
      // Retrieve the fee payment
      const feePayment = await prisma.feePayment.findUnique({
        where: { id: Number(id) },
      });

      if (!feePayment) {
        throw new Error('Fee payment not found');
      }

      // Execute the transaction
      const [studentInfo, paymentInfo] = await prisma.$transaction([
        // Delete the fee payment
        prisma.feePayment.delete({
          where: { id: Number(id) },
        }), // Update the student's feePaid and feeBalance
        prisma.student.update({
          where: { id: feePayment.studentId },
          data: {
            feePaid: {
              decrement: feePayment.amount,
            },
            feeBalance: {
              increment: feePayment.amount,
            },
          },
        }),
      ]);

      return paymentInfo;
    } catch (error) {
      FormatData(error);
    }
  }
}

export default FeeRepository;
