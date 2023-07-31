const router = require('express').Router();
const jwt = require('jsonwebtoken')
const {
  models: { User, Employer },
} = require('../db');
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    const { role, username, password } = req.body;

    let authFunction;
    if (role === 'Employee') {
      authFunction = User.authenticate;
    } else if (role === 'Employer') {
      authFunction = Employer.authenticateEmployer;
    } else {
      return res.status(400).send('Invalid role');
    }

    const token = await authFunction({ username, password });
    const payload = { id: token.id, role };
    const jwtOptions = { expiresIn: '1d' };
    const signedToken = jwt.sign(payload, process.env.JWT, jwtOptions);
    res.send({ token: signedToken });
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const { role } = req.body;

    const userModel = role === 'Employee' ? User : Employer;

    const user = await userModel.create(req.body);

    const payload = { id: user.id, role };
    const jwtOptions = { expiresIn: '1d' };
    const signedToken = jwt.sign(payload, process.env.JWT, jwtOptions);

    res.send({ token: signedToken });
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

    const decodedToken = jwt.verify(token, process.env.JWT);
    const { id, role } = decodedToken;

    let userModel;
    if (role === 'Employee') {
      userModel = User;
    } else if (role === 'Employer') {
      userModel = Employer;
    } else {
      return res.status(400).send('Invalid role');
    }

    const user = await userModel.findByPk(id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.send(user);
  } catch (ex) {
    next(ex);
  }
});

