const Sequelize = require('sequelize')
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 5;

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
  },
  imgUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg'
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
    type: Sequelize.ENUM('employee', 'employer'),
    allowNull: false,
    defaultValue: 'employee'
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  industry: {
    type: Sequelize.STRING,
    allowNull: false
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false
  },
  locationPreference: {
    type: Sequelize.ENUM('on-site', 'hybrid', 'remote'),
    allowNull: false,
    defaultValue: 'on-site'
  },
  salaryExpectation: {
    type: Sequelize.INTEGER,
  },
  jobStatus: {
    type: Sequelize.ENUM('employed', 'unemployed', 'n/a'),
    allowNull: false,
    defaultValue: 'n/a'
  },
  jobLevel: {
    type: Sequelize.ENUM('entrylevel', 'associate', 'mid-senior', 'directors', 'exec'),
    allowNull: false,
    defaultValue: 'entrylevel'
  },
  jobSeeking: {
    type: Sequelize.STRING,
  },
  yearsOfExperience: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  educationLevel: {
    type: Sequelize.ENUM('highschool', 'associate', 'bachelors', 'masters', 'doctoral'),
    allowNull: false,
    defaultValue: 'highschool'
  },
  languages: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'english'
  },
  
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
}

User.prototype.generateToken = function() {
  return jwt.sign({id: this.id}, process.env.JWT)
}

/**
 * classMethods
 */
User.authenticate = async function({ username, password }){
    const user = await this.findOne({where: { username }})
    if (!user || !(await user.correctPassword(password))) {
      const error = Error('Incorrect username/password');
      error.status = 401;
      throw error;
    }
    return user.generateToken();
};

User.findByToken = async function(token) {
  try {
    const {id} = await jwt.verify(token, process.env.JWT)
    const user = User.findByPk(id)
    if (!user) {
      throw 'nooo'
    }
    return user
  } catch (ex) {
    const error = Error('bad token')
    error.status = 401
    throw error
  }
}

/**
 * hooks
 */
const hashPassword = async(user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
}

User.beforeCreate(hashPassword)
User.beforeUpdate(hashPassword)
User.beforeBulkCreate(users => Promise.all(users.map(hashPassword)))
