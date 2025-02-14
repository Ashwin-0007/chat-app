'use strict';
const {Model, Sequelize} = require('sequelize');
const sequelize = require('../../config/database');

module.exports = sequelize.define('User', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  password: {
    type: Sequelize.STRING
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  deletedAt:{
    type: Sequelize.DATE
  }
},{
  paranoid: true,
  freezeTable: true,
  modelName: 'User',
})