const express = require('express');
const mongodb = require('../data/db');
const ObjectId = require('mongodb').ObjectId;

const getAllUsers = async (req, res) => {
  //#swagger.tags = ['Users']
  // const result = await mongodb.getDb().db().collection('users').find();
  // result.toArray().then((users) => {
  //   res.setHeader('Content-Type', 'application/json');
  //   res.status(200).json(users);
  // });
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection('users')
      .find()
      .toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getSingleUser = async (req, res) => {
  //#swagger.tags = ['Users']
  // const userId = new ObjectId(req.params.id);
  // const result = await mongodb
  //   .getDb()
  //   .db()
  //   .collection('users')
  //   .find({ _id: userId });
  // result.toArray().then((users) => {
  //   res.setHeader('Content-Type', 'application/json');
  //   res.status(200).json(users[0]);
  // });
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must be a valid ID to find');
      return;
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('users')
      .findOne({ _id: userId });

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

const createUser = async (req, res) => {
  //#swagger.tags = ['Users']
  const newUser = {
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  };
  const result = await mongodb
    .getDb()
    .db()
    .collection('users')
    .insertOne(newUser);
  if (result.acknowledged > 0) {
    res.status(201).json(result);
  } else {
    res.status(500).json(result.err || 'Error creating User');
  }
};

const updateUser = async (req, res) => {
  //#swagger.tags = ['Users']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must be a valid ID to update');
    return;
  }
  const userId = new ObjectId(req.params.id);
  const updatedUser = {
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  };
  const result = await mongodb
    .getDb()
    .db()
    .collection('users')
    .updateOne({ _id: userId }, { $set: updatedUser });
  if (result.modifiedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json({ message: 'Error updating user' });
  }
};

const deleteUser = async (req, res) => {
  //#swagger.tags = ['Users']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must be a valid ID to delete');
    return;
  }
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('users')
    .deleteOne({ _id: userId });
  if (result.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json({ message: 'Error deleting User' });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};
