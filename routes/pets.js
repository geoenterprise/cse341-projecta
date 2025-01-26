const express = require('express');
const router = express.Router();
const petValidation = require('../validations/petValidation');
const errorHandling = require('../middlewares/errorHandling');

const petsController = require('../controllers/pets');

router.get('/', petsController.getAllPets);
router.get('/:id', petsController.getSinglePet);

router.post('/', petValidation, errorHandling, petsController.createPet);

router.put('/:id', petValidation, errorHandling, petsController.updatePet);

router.delete('/:id', petsController.deletePet);

module.exports = router;
