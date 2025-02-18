'use strict';
const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../../config/database');
const AppError = require('../../utils/AppError');

 const User = sequelize.define('User', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'firstName can not be null',
      },
      notEmpty: {
        msg: 'firstName can not be empty'
      }
    }
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'lastName can not be null',
      },
      notEmpty: {
        msg: 'lastName can not be empty'
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Email cannot be null',
      },
      notEmpty: {
        msg: 'Email cannot be empty',
      },
      isEmail: {
        msg: 'Invalid email format',
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      notEmpty: {
        msg: 'Password cannot be empty',
      },
      len: {
        args: [7, 100],
        msg: 'Password must be at least 7 characters long',
      },
    },
  },
  confirmPassword: {
    type: DataTypes.VIRTUAL,
    validate: {
      isMatch(value) {
        if (value !== this.password) {
          throw new AppError('Password and Confirm Password must be the same', 400);
        }
      },
    },
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  deletedAt:{
    type: DataTypes.DATE,
    allowNull: true,
  }
},{
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  modelName: 'User',
})

module.exports = User;