import { Application, NextFunction, Request, Response, Router } from 'express';
import * as Yup from 'yup';
import validateRequest from '../middlewares/validateRequest';
const { FeeService } = require('../services');

const feeSchema = Yup.object().shape({
  body: Yup.object().shape({
    studentId: Yup.number().required('Student Id is required'),
    payment_mode: Yup.string().required('payment mode is required'),
    reference: Yup.string().required('reference is required'),
    classId: Yup.number().required('Class Id is required'),
    amount: Yup.number().required('Student Id is required'),
  }),
});

module.exports = (app: Application) => {
  const service = new FeeService();

  app.post(
    '/api/fee-payments/post',
    validateRequest(feeSchema),
    async (req, res, next) => {
      try {
        const { data } = await service.CreateFee(req.body);
        return res.status(201).json(data);
      } catch (error) {
        next(error);
      }
    }
  );

  app.get('/api/feepayments/all', async (req, res, next) => {
    try {
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;

      const { data } = await service.GetAllTeachers({ page, limit });
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  });

  app.get('/api/feepayment/:id', async (req, res, next) => {
    try {
      const { data } = await service.GetTeacherById(Number(req.params.id));
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  });

  app.patch(
    '/api/fee-payments/:id',
    validateRequest(feeSchema),
    async (req, res, next) => {
      try {
        const { data } = await service.UpdateTeacher(
          Number(req.params.id),
          req.body
        );
        return res.status(202).json(data);
      } catch (error) {
        next(error);
      }
    }
  );

  app.delete('/api/fee-payments/:id', async (req, res, next) => {
    try {
      const { data } = await service.DeleteTeacher(Number(req.params.id));
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  });
};
