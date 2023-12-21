import { Application } from 'express';

const express = require('express');
const cors = require('cors');
const { teachers, auth, report } = require('./api');

// const { CreateChannel } = require('./utils');

module.exports = async (app: Application) => {
  app.use(express.json());
  app.use(cors());
  app.use(express.static(__dirname + '/public'));

  //   const channel = await CreateChannel();
  teachers(app);
  auth(app);
  report(app);

  // error handling
};
