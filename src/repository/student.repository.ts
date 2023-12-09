import { PrismaClient } from '@prisma/client';
const { FormatData } = require('../utils');

const prisma = new PrismaClient();

class StudentRepository {
  async CreateStudent(args: any) {
    try {
      // see fee balance
      args.feeBalance = args.feeAmount;
      const student = await prisma.student.create({ data: args });
      return student;
    } catch (error) {
      FormatData(error);
    }
  }

  async GetAllStudents(args: { page: number; limit: number }) {
    try {
      const { page, limit } = args;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const students = await prisma.student.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        // return student's class name
        include: {
          Class: true,
        },
        skip: startIndex,
        take: limit,
      });

      const totalItems = await prisma.student.count();
      return {
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        itemsPerPage: limit,
        totalItems: totalItems,
        items: students.slice(0, endIndex),
      };
    } catch (error) {
      FormatData(error);
    }
  }

  async GetStudentById(id: number) {
    try {
      const student = await prisma.student.findUnique({
        where: {
          id,
        },
      });
      return student;
    } catch (error) {
      FormatData(error);
    }
  }

  async UpdateStudent(id: number, args: any) {
    try {
      const student = await prisma.student.update({
        where: {
          id,
        },
        data: args,
      });
      return student;
    } catch (error) {
      FormatData(error);
    }
  }

  async DeleteStudent(id: number) {
    try {
      const student = await prisma.student.delete({
        where: {
          id,
        },
      });
      return student;
    } catch (error) {
      FormatData(error);
    }
  }

  async SearchStudentByName(args: {
    name: string;
    page: number;
    limit: number;
  }) {
    try {
      const { name, page, limit } = args;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const students = await prisma.student.findMany({
        where: {
          OR: [
            {
              first_name: {
                contains: name?.toString().toLowerCase() || '',
                mode: 'insensitive',
              },
            },
            {
              last_name: {
                contains: name?.toString().toLowerCase() || '',
                mode: 'insensitive',
              },
            },
          ],
        },
        skip: startIndex,
        take: limit,
      });

      const totalItems = await prisma.student.count({
        where: {
          OR: [
            {
              first_name: {
                contains: name?.toString().toLowerCase() || '',
                mode: 'insensitive',
              },
            },
            {
              last_name: {
                contains: name?.toString().toLowerCase() || '',
                mode: 'insensitive',
              },
            },
          ],
        },
      });
      return {
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        itemsPerPage: limit,
        totalItems: totalItems,
        items: students.slice(0, endIndex),
      };
    } catch (error) {
      FormatData(error);
    }
  }
}

module.exports = StudentRepository;
