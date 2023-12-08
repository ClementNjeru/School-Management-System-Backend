import { Application, NextFunction, Request, Response, Router } from 'express';
import * as Yup from 'yup';
import validateRequest from '../middlewares/validateRequest';
import { phoneRegex as phoneRegExp } from '../utils';
const { TeacherService } = require('../services');

const teacherSchema = Yup.object().shape({
  body: Yup.object().shape({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    phone: Yup.string()
      .required('Your phone number is required.')
      .test('is-phone', 'Must be a valid phone number', (value) => {
        if (phoneRegExp.test(value ?? '')) {
          return true;
        }
        return false;
      }),
  }),
});

module.exports = (app: Application) => {
  const service = new TeacherService();

  app.post(
    '/teacher/post',
    validateRequest(teacherSchema),
    async (req, res, next) => {
      try {
        const { data } = await service.CreateTeacher(req.body);
        return res.status(201).json(data);
      } catch (error) {
        next(error);
      }
    }
  );

  app.get('/teachers/all', async (req, res, next) => {
    try {
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;

      const { data } = await service.GetAllTeachers({ page, limit });
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  });

  app.get('/teacher/:id', async (req, res, next) => {
    try {
      const { data } = await service.GetTeacherById(Number(req.params.id));
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  });

  app.patch(
    '/teacher/:id',
    validateRequest(teacherSchema),
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

  app.delete('/teacher/:id', async (req, res, next) => {
    try {
      const { data } = await service.DeleteTeacher(Number(req.params.id));
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  });

  app.get('/teachers/search/:name', async (req, res, next) => {
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
