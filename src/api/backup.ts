import { Application, NextFunction, Request, Response } from 'express';
const { BackupService } = require('../services');

module.exports = (app: Application) => {
  const service = new BackupService();
  app.post(
    '/api/reset-database',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { data } = await service.Resetdatabase;
        return res.status(200).json(data);
      } catch (error) {
        next(error);
      }
    }
  );

  app.post(
    '/api/partial-reset-database',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { data } = await service.PartialResetdatabase;
        return res.status(200).json(data);
      } catch (error) {
        next(error);
      }
    }
  );
};
