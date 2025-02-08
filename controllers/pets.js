const express = require('express');
const mongodb = require('../data/db');
const ObjectId = require('mongodb').ObjectId;

const getAllPets = async (req, res) => {
  //#swagger.tags = ['Pets']
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection('pets')
      .find()
      .toArray();

    // result.toArray().then((pets) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
    // });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getSinglePet = async (req, res) => {
  //#swagger.tags=['Pets']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must be a valid ID to find');
      return;
    }
    const petId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('pets')
      .findOne({ _id: petId });

    if (!result) {
      res.status(404).json({ message: 'Pet not found' });
      return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const createPet = async (req, res) => {
  //#swagger.tags = ['Pets']
  const newPet = {
    name: req.body.name,
    species: req.body.species,
    breed: req.body.breed,
    age: req.body.age,
    gender: req.body.gender,
    weight: req.body.weight,
    available: req.body.available,
    adoptedDate: req.body.adoptedDate,
    description: req.body.description,
  };
  const result = await mongodb
    .getDb()
    .db()
    .collection('pets')
    .insertOne(newPet);
  if (result.acknowledged > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(result.err || 'Error creating pet');
  }
};

const updatePet = async (req, res) => {
  //#swagger.tags = ['Pets']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must be a valid ID to update');
    return;
  }
  const petId = new ObjectId(req.params.id);
  const updatedPet = {
    name: req.body.name,
    species: req.body.species,
    breed: req.body.breed,
    age: req.body.age,
    gender: req.body.gender,
    weight: req.body.weight,
    available: req.body.available,
    adoptedDate: req.body.adoptedDate,
    description: req.body.description,
  };
  const result = await mongodb
    .getDb()
    .db()
    .collection('pets')
    .updateOne({ _id: petId }, { $set: updatedPet });
  if (result.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json({ message: 'Error updating pet' });
  }
};

const deletePet = async (req, res) => {
  //#swagger.tags = ['Pets']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must be a valid ID to delete');
    return;
  }
  const petId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('pets')
    .deleteOne({ _id: petId }); //this does not retun an errors so .jso(result.error) won't work.
  if (result.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json({ message: 'Pet not found or already deleted' });
  }
};

module.exports = {
  getAllPets,
  getSinglePet,
  createPet,
  updatePet,
  deletePet,
};
