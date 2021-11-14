const { Sequelize, DataTypes } = require('sequelize');

module.exports = new Sequelize('users', 'postgres', 'nikedudu', {
    host: 'localhost',
    dialect: 'postgres',
    port:5432,
  });