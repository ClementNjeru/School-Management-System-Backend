import { Application, NextFunction, Request, Response } from 'express';
import * as Yup from 'yup';
import validateRequest from '../middlewares/validateRequest';
const { ClassService } = require('../services');

const classSchema = Yup.object().shape({
  body: Yup.object().shape({
    name: Yup.string().required('First name is required'),
    teacherId: Yup.number().required('Class Teacher Id is required'),
  }),
});

module.exports = (app: Application) => {
  const service = new ClassService();

  app.post(
    '/api/classes/post',
    validateRequest(classSchema),
    async (req, res, next) => {
      try {
        const { data } = await service.CreateClass(req.body);
        return res.status(201).json(data);
      } catch (error) {
        next(error);
      }
    }
  );

  app.get('/api/classes/all', async (req, res, next) => {
    try {
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;

      const { data } = await service.GetAllClasses({ page, limit });
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  });

  app.get('/api/class/:id', async (req, res, next) => {
    try {
      const { data } = await service.GetClassById(Number(req.params.id));
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  });

  app.patch(
    '/api/class/:id',
    validateRequest(classSchema),
    async (req, res, next) => {
      try {
        const { data } = await service.UpdateClass(
          Number(req.params.id),
          req.body
        );
        return res.status(202).json(data);
      } catch (error) {
        next(error);
      }
    }
  );

  app.delete('/api/class/:id', async (req, res, next) => {
    try {
      const { data } = await service.DeleteClass(Number(req.params.id));
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  });

  app.get('/api/classes/search/:name', async (req, res, next) => {
    const { name } = req.params;
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    try {
      const { data } = await service.SearchTeacherByName({ name, page, limit });
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  });
};
