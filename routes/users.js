const express = require('express');
const router = express.Router();
const userValidation = require('../validations/userValidation');
const errorHandling = require('../middlewares/errorHandling');

const usersController = require('../controllers/users');
const { isAuthenticated } = require('../middlewares/authenticate');

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getSingleUser);
router.post(
  '/',
  isAuthenticated,
  userValidation,
  errorHandling,
  usersController.createUser
);
router.put(
  '/:id',
  isAuthenticated,
  userValidation,
  errorHandling,
  usersController.updateUser
);
router.delete('/:id', isAuthenticated, usersController.deleteUser);

module.exports = router;
