import { PrismaClient } from '@prisma/client';
const { FormatData } = require('../utils');

const prisma = new PrismaClient();

class ClassRepository {
  async CreateClass(args: any) {
    const Class = await prisma.class.create({ data: args });
    return Class;
  }

  async GetAllClasses(args: { page: number; limit: number }) {
    try {
      const { page, limit } = args;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const Classes = await prisma.class.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        skip: startIndex,
        take: limit,
      });

      const totalItems = await prisma.class.count();
      return {
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        itemsPerPage: limit,
        totalItems: totalItems,
        items: Classes.slice(0, endIndex),
      };
    } catch (error) {
      FormatData(error);
    }
  }

  async GetClassById(id: number) {
    try {
      const Class = await prisma.class.findUnique({
        where: {
          id,
        },
      });
      return Class;
    } catch (error) {
      FormatData(error);
    }
  }

  async UpdateClass(id: number, args: any) {
    try {
      const Class = await prisma.class.update({
        where: {
          id,
        },
        data: args,
      });
      return Class;
    } catch (error) {
      FormatData(error);
    }
  }

  async DeleteClass(id: number) {
    try {
      const Class = await prisma.class.delete({
        where: {
          id,
        },
      });
      return Class;
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

      const classes = await prisma.class.findMany({
        where: {
          name: {
            contains: name?.toString().toLowerCase() || '',
            mode: 'insensitive',
          },
        },
        skip: startIndex,
        take: limit,
      });

      if (!classes) {
        throw new Error('class not found');
      }

      const totalItems = await prisma.class.count({
        where: {
          name: {
            contains: name?.toString().toLowerCase() || '',
            mode: 'insensitive',
          },
        },
      });

      return {
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        itemsPerPage: limit,
        totalItems: totalItems,
        items: classes.slice(0, endIndex),
      };
    } catch (error) {
      FormatData(error);
    }
  }
}

module.exports = ClassRepository;
