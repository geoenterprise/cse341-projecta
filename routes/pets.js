const express = require('express');
const router = express.Router();
const petValidation = require('../validations/petValidation');
const errorHandling = require('../middlewares/errorHandling');
const { isAuthenticated } = require('../middlewares/authenticate');

const petsController = require('../controllers/pets');

router.get('/', petsController.getAllPets);
router.get('/:id', petsController.getSinglePet);

router.post(
  '/',
  isAuthenticated,
  petValidation,
  errorHandling,
  petsController.createPet
);

router.put(
  '/:id',
  isAuthenticated,
  petValidation,
  errorHandling,
  petsController.updatePet
);

router.delete('/:id', isAuthenticated, petsController.deletePet);

module.exports = router;
