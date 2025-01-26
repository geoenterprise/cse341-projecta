const routes = require('express').Router();
const pets = require('./pets');
const users = require('./users');

routes.use('/', require('./swagger'));
routes.use('/users', users);
routes.use('/pets', pets);
routes.get('/', (req, res) => {
  res.send('Welcome to the Pet Adoption API!');
});

module.exports = routes;
