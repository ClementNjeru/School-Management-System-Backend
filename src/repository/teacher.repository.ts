import { PrismaClient } from '@prisma/client';
const { FormatData } = require('../utils');

const prisma = new PrismaClient();

class TeacherRepository {
  async CreateTeacher(args: any) {
    const teacher = await prisma.teacher.create({ data: args });
    return teacher;
  }

  async GetAllTeachers(args: { page: number; limit: number }) {
    try {
      const { page, limit } = args;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const teachers = await prisma.teacher.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        // return teacher's class name
        include: {
          Class: true,
        },
        skip: startIndex,
        take: limit,
      });

      const totalItems = await prisma.teacher.count();
      return {
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        itemsPerPage: limit,
        totalItems: totalItems,
        items: teachers.slice(0, endIndex),
      };
    } catch (error) {
      FormatData(error);
    }
  }

  async FindById(id: number) {
    return await prisma.teacher.findUnique({
      where: {
        id,
      },
    });
  }

  async UpdateTeacher(id: number, args: any) {
    try {
      const teacher = await prisma.teacher.update({
        where: {
          id,
        },
        data: args,
      });

      return teacher;
    } catch (error) {
      FormatData(error);
    }
  }

  async DeleteTeacher(id: number) {
    try {
      const teacher = await prisma.teacher.delete({
        where: {
          id,
        },
      });
      return teacher;
    } catch (error) {
      FormatData(error);
    }
  }

  async SearchTeacherByName(args: {
    name: string;
    page: number;
    limit: number;
  }) {
    try {
      const { name, page, limit } = args;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const teachers = await prisma.teacher.findMany({
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

      const totalItems = await prisma.teacher.count({
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
        items: teachers.slice(0, endIndex),
      };
    } catch (error) {
      FormatData(error);
    }
  }
}

module.exports = TeacherRepository;
