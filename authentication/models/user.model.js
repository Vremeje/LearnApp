const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../db.js");


    const User = sequelize.define("users", {
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      token:{
        type: Sequelize.STRING
      }
    });
    
    module.exports = User;
 