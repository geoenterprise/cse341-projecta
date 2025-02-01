const isAuthenticated = (req, res, next) => {
  if (req.session.user === undefined) {
    res.status(401).json('You do not have access.');
  }
  next();
};

module.exports = {
  isAuthenticated,
};
