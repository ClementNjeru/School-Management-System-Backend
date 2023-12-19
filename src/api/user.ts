import { Application, NextFunction, Request, Response, Router } from 'express';
import * as Yup from 'yup';
import validateRequest from '../middlewares/validateRequest';
import { phoneRegex as phoneRegExp, emailRegex } from '../utils';
const { UserService } = require('../services');

const userSchema = Yup.object().shape({
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
    email: Yup.string()
      .nullable()
      .email('Must be a valid email address.')
      .matches(emailRegex, 'Must be a valid email address.'),
    password: Yup.string().required('Password is required'),
    role: Yup.string().required('Role is required'),
    activeStatus: Yup.boolean().required('Status is required'),
  }),
});

module.exports = (app: Application) => {
  const service = new UserService();

  app.post('/users/post', async (req, res, next) => {
    try {
      const { data } = await service.CreateUser(req.body);
      return res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  });

  app.get('/users/all', async (req, res, next) => {
    try {
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;

      const { data } = await service.GetAllusers({ page, limit });
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  });

  app.get('/user/:id', async (req, res, next) => {
    try {
      const { data } = await service.GetUserById(Number(req.params.id));
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  });

  app.patch('/user/:id', async (req, res, next) => {
    try {
      const { data } = await service.UpdateUser(
        Number(req.params.id),
        req.body
      );
      return res.status(202).json(data);
    } catch (error) {
      next(error);
    }
  });

  app.delete('/user/:id', async (req, res, next) => {
    try {
      const { data } = await service.DeleteUser(Number(req.params.id));
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  });

  app.get('/users/search/:name', async (req, res, next) => {
    const { name } = req.params;
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    try {
      const { data } = await service.SearchUserByName({
        name,
        page,
        limit,
      });
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  });
};
