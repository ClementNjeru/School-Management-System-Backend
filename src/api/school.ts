import { Application, NextFunction, Request, Response, Router } from 'express';
import * as Yup from 'yup';
import validateRequest from '../middlewares/validateRequest';
import { phoneRegex as phoneRegExp } from '../utils';
const { SchoolService } = require('../services');

module.exports = (app: Application) => {};
