const express = require('express');
const mongodb = require('../data/db');
const ObjectId = require('mongodb').ObjectId;

const getAllPets = async (req, res) => {
  //#swagger.tags = ['Pets']
  const result = await mongodb.getDb().db().collection('pets').find();
  result.toArray().then((pets) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(pets);
  });
};

const getSinglePet = async (req, res) => {
  //#swagger.tags = ['Pets']
  const petId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('pets')
    .find({ _id: petId });
  result.toArray().then((pets) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(pets[0]);
  });
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
  if (result.aknowledged > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(result.err || 'Error creating pet');
  }
};

const updatePet = async (req, res) => {
  //#swagger.tags = ['Pets']
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
    res.status(500).json(result.err || 'Error updating pet');
  }
};

const deletePet = async (req, res) => {
  //#swagger.tags = ['Pets']
  const petId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('pets')
    .deleteOne({ _id: petId });
  if (result.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(result.err || 'Error deleting pet');
  }
};

module.exports = {
  getAllPets,
  getSinglePet,
  createPet,
  updatePet,
  deletePet,
};
