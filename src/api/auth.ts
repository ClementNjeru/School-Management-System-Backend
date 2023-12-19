import { Application, NextFunction, Request, Response, Router } from 'express';
import * as Yup from 'yup';
import validateRequest from '../middlewares/validateRequest';
import { phoneRegex as phoneRegExp } from '../utils';
const { AuthService } = require('../services');

module.exports = (app: Application) => {
  const service = new AuthService();
  app.post(
    '/api/login',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { data } = await service.Login;
        return res.status(201).json(data);
      } catch (error) {
        next(error);
      }
    }
  );
  app.post(
    '/api/verify-email',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { data } = await service.VerifyEmail;
        return res.status(200).json(data);
      } catch (error) {
        next(error);
      }
    }
  );

  app.post(
    '/api/reset-password',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { data } = await service.ResetPassword;
        return res.status(200).json(data);
      } catch (error) {
        next(error);
      }
    }
  );
};
