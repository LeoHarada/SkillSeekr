const router = require('express').Router();
const { models: { Employer }} = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const employers = await Employer.findAll({
      attributes: [
        'id', 
        'username', 
        'email', 
        'role', 
        'firstname', 
        'lastname', 
        'industry', 
        'location', 
        'company', 
        'languages',
    ]
    })
    res.json(employers)
  } catch (err) {
    next(err)
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const employer = await Employer.findByPk(id, {
      attributes: [
        'id',
        'username',
        'email',
        'role',
        'firstname',
        'lastname',
        'industry',
        'location',
        'company',
        'languages',
      ],
    });

    if (employer) {
      res.json(employer);
    } else {
      res.status(404).json({ error: 'Employer not found' });
    }
  } catch (err) {
    next(err);
  }
});

router.put('/:id/edit', async (req, res, next) => {
  try {
    const { id } = req.params;
    const {       
      email,
      role,
      firstname,
      lastname,
      industry,
      location,
      company,
      languages } = req.body;

    const employer = await Employer.findByPk(id);
    if (!employer) {
      return res.status(404).json({ error: 'Employer not found' });
    }

    // Update the user's data
    await employer.update({
      email,
      role,
      firstname,
      lastname,
      industry,
      location,
      company,
      languages,
    });

    res.json({ message: 'Employer data updated successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;