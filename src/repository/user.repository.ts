import { PrismaClient } from '@prisma/client';
const bcrypt = require('bcryptjs');
const { FormatData } = require('../utils');

const prisma = new PrismaClient();

class UserRepository {
  async CreateUser(args: any) {
    try {
      const { email, password } = args;
      const user = await prisma.user.findUnique({ where: { email } });
      if (user) {
        return { message: 'User already exists' };
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await prisma.user.create({
        data: { ...args, password: hashedPassword },
      });
      return result;
    } catch (error) {
      FormatData(error);
    }
  }

  async GetAllUsers(args: { page: number; limit: number }) {
    try {
      const { page, limit } = args;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const users = await prisma.user.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        skip: startIndex,
        take: limit,
      });

      const totalItems = await prisma.user.count();
      return {
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        itemsPerPage: limit,
        totalItems: totalItems,
        items: users.slice(0, endIndex),
      };
    } catch (error) {
      FormatData(error);
    }
  }

  async GetUserById(id: number) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });
      return user;
    } catch (error) {
      FormatData(error);
    }
  }

  async UpdateUser(id: number, args: any) {
    try {
      const user = await prisma.user.update({
        where: {
          id,
        },
        data: args,
      });
      return user;
    } catch (error) {
      FormatData(error);
    }
  }

  async DeleteUser(id: number) {
    try {
      const user = await prisma.user.delete({
        where: {
          id,
        },
      });
      return user;
    } catch (error) {
      FormatData(error);
    }
  }

  async SearchUserByName(args: { name: string; page: number; limit: number }) {
    try {
      const { name, page, limit } = args;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const users = await prisma.user.findMany({
        where: {
          name: {
            contains: name,
            mode: 'insensitive',
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: startIndex,
        take: limit,
      });

      const totalItems = await prisma.user.count({
        where: {
          name: {
            contains: name,
            mode: 'insensitive',
          },
        },
      });
      return {
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        itemsPerPage: limit,
        totalItems: totalItems,
        items: users.slice(0, endIndex),
      };
    } catch (error) {
      FormatData(error);
    }
  }
}

module.exports = UserRepository;
