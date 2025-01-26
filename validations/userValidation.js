const { check } = require('express-validator');

const userValidation = [
  check('userName')
    .notEmpty()
    .withMessage('User Name is required')
    .isString()
    .isLength({ min: 5 })
    .withMessage('Username must be at least 5 characters long'),

  check('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be a valid email address'),

  check('password')
    .notEmpty()
    .withMessage('You must provide a password')
    .isString()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),

  check('role')
    .notEmpty()
    .withMessage('A role is required user or admin')
    .isString()
    .isIn(['user', 'admin'])
    .withMessage('Role must be either user or admin'),
];

module.exports = userValidation;
