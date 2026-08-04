const express = require('express');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const userController = require('../controllers/userController');
const contestController = require('../controllers/contestController');
const validators = require('../middlewares/validators');
const upload = require('../utils/fileUpload');
const contestsRouter = express.Router();

// POST /contests
contestsRouter.post(
  '/',
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  userController.payment,
);

// GET /contests/byCustomer
contestsRouter.get(
  '/byCustomer',
  contestController.getCustomersContests,
);

// GET /contests/:id
contestsRouter.get(
  '/:contestId',
  basicMiddlewares.canGetContest,
  contestController.getContestById,
);

module.exports = contestsRouter;
