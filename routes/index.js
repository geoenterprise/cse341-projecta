const routes = require('express').Router();
const passport = require('passport');
const pets = require('./pets');
const users = require('./users');

routes.use('/', require('./swagger'));
routes.use('/users', users);
routes.use('/pets', pets);
routes.get('/', (req, res) => {
  res.send('Welcome to the Pet Adoption API!');
});
routes.get('/login', passport.authenticate('github'), (req, res) => {});

routes.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = routes;
