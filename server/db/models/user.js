'use strict';
const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../../config/database');

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
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
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