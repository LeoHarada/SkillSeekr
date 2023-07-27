const router = require('express').Router();
const { models: { User }} = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: [
        'id', 
        'username', 
        'email', 
        'role', 
        'firstname', 
        'lastname', 
        'industry', 
        'location', 
        'locationpreference', 
        'salaryexpectation', 
        'jobstatus', 
        'joblevel', 
        'jobseeking', 
        'yearsofexperience', 
        'educationlevel', 
        'languages'
    ]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: [
        'id',
        'username',
        'email',
        'role',
        'firstname',
        'lastname',
        'industry',
        'location',
        'locationpreference',
        'salaryexpectation',
        'jobstatus',
        'joblevel',
        'jobseeking',
        'yearsofexperience',
        'educationlevel',
        'languages',
      ],
    });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const {       
      email,
      role,
      firstname,
      lastname,
      industry,
      location,
      locationpreference,
      salaryexpectation,
      jobstatus,
      joblevel,
      jobseeking,
      yearsofexperience,
      educationlevel,
      languages } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user's data
    await user.update({
      email,
      role,
      firstname,
      lastname,
      industry,
      location,
      locationpreference,
      salaryexpectation,
      jobstatus,
      joblevel,
      jobseeking,
      yearsofexperience,
      educationlevel,
      languages
    });

    res.json({ message: 'User data updated successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;