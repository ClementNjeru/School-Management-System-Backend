import { PrismaClient } from '@prisma/client';
const { FormatData } = require('../utils');
import { partialReset, resetDatabase } from '../reset';
import { isSuperAdmin } from '../middlewares/isSuperAdmin.middleware';

const prisma = new PrismaClient();

class BackupRepository {
  async Resetdatabase() {
    try {
      await resetDatabase(prisma);
      return { message: 'Database reset successfully' };
    } catch (error) {
      FormatData(error);
    }
  }

  async PartialResetdatabase() {
    try {
      await partialReset(prisma);
      return { message: 'Database reset successfully' };
    } catch (error) {
      FormatData(error);
    }
  }
}

module.exports = BackupRepository;
