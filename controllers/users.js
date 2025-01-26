const express = require('express');
const mongodb = require('../data/db');
const ObjectId = require('mongodb').ObjectId;

const getAllUsers = async (req, res) => {
  //#swagger.tags = ['Users']
  const result = await mongodb.getDb().db().collection('users').find();
  result.toArray().then((users) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users);
  });
};

const getSingleUser = async (req, res) => {
  //#swagger.tags = ['Users']
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('users')
    .find({ _id: userId });
  result.toArray().then((users) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users[0]);
  });
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
  if (result.aknowledged > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(result.err || 'Error creating User');
  }
};

const updateUser = async (req, res) => {
  //#swagger.tags = ['Users']
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
    res.status(204).send();
  } else {
    res.status(500).json(result.err || 'Error updating user');
  }
};

const deleteUser = async (req, res) => {
  //#swagger.tags = ['Users']
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('users')
    .deleteOne({ _id: userId });
  if (result.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(result.err || 'Error deleting User');
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};
