const express = require('express');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const userController = require('../controllers/userController');
const checkToken = require('../middlewares/checkToken');
const validators = require('../middlewares/validators');
const upload = require('../utils/fileUpload');
const contestsRouter = express.Router();

contestsRouter.post(
  '/',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  userController.payment,
);

module.exports = contestsRouter;
