const express = require('express');
const router = express.Router();
const userValidation = require('../validations/userValidation');
const errorHandling = require('../middlewares/errorHandling');

const usersController = require('../controllers/users');

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getSingleUser);
router.post('/', userValidation, errorHandling, usersController.createUser);
router.put('/:id', userValidation, errorHandling, usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;
