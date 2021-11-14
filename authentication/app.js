const express = require("express");
const bodyParser = require("body-parser");
const router = require("./router");
const User = require("./models/user.model");
const { Sequelize, DataTypes } = require('sequelize');
const db = require("./db.js");


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



  
  async function check(){
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  }
  check();

  async function sync(){await db.sync({ force: true });
console.log("All models were synchronized successfully.");}
  
sync();


app.use(router);











app.listen(3000, ()=>console.log("Listening on port 3000..."));