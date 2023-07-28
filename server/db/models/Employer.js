const Sequelize = require('sequelize')
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 5;

const Employer = db.define('employer', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
  },
  imgurl: {
    type: Sequelize.STRING,
    defaultValue: '/images/employertie.png'
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique:true,
    validate: {
        notEmpty: true,
        isEmail: true,
    }
  },
  role: {
    type: Sequelize.ENUM('Employer'),
    allowNull: false
  },
  firstname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  industry: {
    type: Sequelize.STRING,
  },
  location: {
    type: Sequelize.STRING,
  },
  company: {
    type: Sequelize.STRING,
  },
  languages: {
    type: Sequelize.STRING,
    defaultValue: 'English'
  }
})

module.exports = Employer

/**
 * instanceMethods
 */
Employer.prototype.correctPassword = function(candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
}

Employer.prototype.generateToken = function() {
  return jwt.sign({id: this.id}, process.env.JWT)
}

/**
 * classMethods
 */
Employer.authenticateEmployer = async function ({ username, password }) {
  const employer = await Employer.findOne({ where: { username } });
  if (!employer || !(await employer.correctPassword(password))) {
    const error = new Error('Incorrect username/password');
    error.status = 401;
    throw error;
  }
  return employer.generateToken();
};


Employer.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const employer = await Employer.findByPk(id);
    if (!employer) {
      throw new Error('Employer not found');
    }
    return employer;
  } catch (ex) {
    const error = new Error('bad token');
    error.status = 401;
    throw error;
  }
};


/**
 * hooks
 */
const hashPassword = async(employer) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (employer.changed('password')) {
    employer.password = await bcrypt.hash(employer.password, SALT_ROUNDS);
  }
}

Employer.beforeCreate(hashPassword)
Employer.beforeUpdate(hashPassword)
Employer.beforeBulkCreate(employers => Promise.all(employers.map(hashPassword)))
