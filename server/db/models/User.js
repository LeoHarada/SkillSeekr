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
  imgurl: {
    type: Sequelize.STRING,
    defaultValue: '/images/employeetie.png'
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
    type: Sequelize.ENUM('Employee'),
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
  locationpreference: {
    type: Sequelize.STRING,
  },
  salaryexpectation: {
    type: Sequelize.INTEGER,
  },
  jobstatus: {
    type: Sequelize.STRING,
  },
  joblevel: {
    type: Sequelize.STRING,
  },
  jobseeking: {
    type: Sequelize.STRING,
  },
  yearsofexperience: {
    type: Sequelize.INTEGER,
  },
  educationlevel: {
    type: Sequelize.STRING,
  },
  languages: {
    type: Sequelize.STRING,
    defaultValue: 'English'
  },
  resume: {
    type: Sequelize.STRING,
    allowNull:true
  }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return bcrypt.compare(candidatePwd, this.password);
}

User.prototype.generateToken = function() {
  return jwt.sign({id: this.id}, process.env.JWT)
}

/**
 * classMethods
 */
User.authenticate = async function ({ username, password }) {
  console.log('Authenticating user:', username);
  const user = await User.findOne({ where: { username } });
  if (!user || !(await user.correctPassword(password))) {
    const error = new Error('Incorrect username/password');
    error.status = 401;
    throw error;
  }
  return user; 
};


User.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (ex) {
    const error = new Error('Bad token');
    error.status = 401;
    throw error;
  }
};


/**
 * hooks
 */
const hashPassword = async(user) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
}

User.beforeCreate(hashPassword)
User.beforeUpdate(hashPassword)
User.beforeBulkCreate(users => Promise.all(users.map(hashPassword)))
