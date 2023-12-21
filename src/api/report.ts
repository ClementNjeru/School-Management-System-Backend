import { Application, NextFunction, Request, Response, Router } from 'express';
const { ReportService } = require('../services');

module.exports = (app: Application) => {
  const service = new ReportService();

  app.get('/api/students/count', async (req, res, next) => {
    try {
      const totalStudents = await service.GetTotalStudent();
      res.status(200).json({ totalStudents });
    } catch (error) {
      next(error);
    }
  });

  app.get('/api/teachers/count', async (req, res, next) => {
    try {
      const totalTeacher = await service.GetTotalTeacher();
      res.status(200).json({ totalTeacher });
    } catch (error) {
      next(error);
    }
  });

  app.get('/api/fees/total', async (req, res, next) => {
    try {
      const totalFees = await service.GetTotalFees();
      res.status(200).json({ totalFees });
    } catch (error) {
      next(error);
    }
  });

  app.get('/api/class/:id/students/count', async (req, res, next) => {
    try {
      const totalStudentByClass = await service.GetTotalStudentByClass();
      res.status(200).json({ totalStudentByClass });
    } catch (error) {
      next(error);
    }
  });

  app.get('/api/fees/payment-mode', async (req, res, next) => {
    try {
      const paymentModes = await service.GetPaymentModes();
      res.status(200).json({ paymentModes });
    } catch (error) {
      next(error);
    }
  });

  app.get('/api/payments/get/paymentmodes', async (req, res, next) => {
    try {
      const revenue = await service.GetTodaysSales();
      res.status(200).json({ revenue });
    } catch (error) {}
  });

  app.get('/api/students/fee-status/:classId', async (req, res, next) => {
    try {
      const classId = Number(req.params.classId);
      const revenue = await service.GetPaymentsModes(classId);
      res.status(200).json({ revenue });
    } catch (error) {}
  });
};
