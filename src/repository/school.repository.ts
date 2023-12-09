import { PrismaClient } from '@prisma/client';
const { FormatData } = require('../utils');

const prisma = new PrismaClient();

class SchoolRepository {
  async CreateSchool(args: any) {
    const school = await prisma.school.create({ data: args });
    return school;
  }

  async GetAllSchools(args: { page: number; limit: number }) {
    try {
      const { page, limit } = args;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const schools = await prisma.school.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        skip: startIndex,
        take: limit,
      });

      const totalItems = await prisma.school.count();
      return {
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        itemsPerPage: limit,
        totalItems: totalItems,
        items: schools.slice(0, endIndex),
      };
    } catch (error) {
      FormatData(error);
    }
  }

  async GetSchoolById(id: number) {
    try {
      const school = await prisma.school.findUnique({
        where: {
          id,
        },
      });
      return school;
    } catch (error) {
      FormatData(error);
    }
  }

  async UpdateSchool(id: number, args: any) {
    try {
      const school = await prisma.school.update({
        where: {
          id,
        },
        data: args,
      });
      return school;
    } catch (error) {
      FormatData(error);
    }
  }
}

module.exports = SchoolRepository;
