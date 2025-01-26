const { check } = require('express-validator');

const petValidation = [
  check('name')
    .notEmpty()
    .withMessage('Name is required')
    .isAlpha()
    .withMessage('Name must contain only letters')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long'),

  check('species').notEmpty().withMessage('Species is required'),

  check('breed')
    .notEmpty()
    .withMessage('Breed is required')
    .isLength({ min: 3 })
    .withMessage('Breed must be at least 3 characters long'),

  check('age')
    .notEmpty()
    .withMessage('Age is required')
    .isFloat()
    .withMessage('Age must be a number'),

  check('gender').notEmpty().withMessage('Gender is required'),

  check('weight')
    .notEmpty()
    .withMessage('Weight is required')
    .isFloat()
    .withMessage('Weight must be a number'),

  check('available')
    .notEmpty()
    .withMessage('Available is required')
    .isBoolean()
    .withMessage('Available must be a boolean'),

  check('adoptedDate')
    .optional()
    .isISO8601()
    .withMessage('Adopted Date must be a date yyyy-mm-dd'),

  check('description')
    .optional()
    .isLength({ min: 3 })
    .withMessage('Description must be at least 3 characters long'),
];

module.exports = petValidation;
