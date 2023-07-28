const router = require('express').Router();
const jwt = require('jsonwebtoken')
const {
  models: { User, Employer },
} = require('../db');
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    const { role } = req.body;

    // Determine whether it's a user or employer attempting to log in
    const authFunction = role === 'Employee' ? User.authenticate : Employer.authenticateEmployer;

    res.send({ token: await authFunction(req.body) });
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const { role } = req.body;

    // Determine whether it's a user or employer signing up
    const userModel = role === 'Employee' ? User : Employer;

    // Create the user/employer
    const user = await userModel.create(req.body);
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.get('/me', async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send('No token provided');
    }

    // Decode the token to get the user/employer id and role
    const { id, role } = jwt.verify(token, process.env.JWT);

    // Determine whether it's a user or employer requesting the profile
    const userModel = role === 'Employee' ? User : Employer;

    // Find the user/employer by their id
    const user = await userModel.findByPk(id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.send(user);
  } catch (ex) {
    next(ex);
  }
});