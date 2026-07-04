const express = require('express');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const userController = require('../controllers/userController');
const contestController = require('../controllers/contestController');
const checkToken = require('../middlewares/checkToken');
const validators = require('../middlewares/validators');
const upload = require('../utils/fileUpload');
const contestsRouter = express.Router();

// POST /contests
contestsRouter.post(
  '/',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  userController.payment,
);

// GET /contests/byCustomer
contestsRouter.get(
  '/byCustomer',
  checkToken.checkToken,
  contestController.getCustomersContests,
);

module.exports = contestsRouter;
