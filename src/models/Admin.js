const { DataTypes } = require("sequelize");
const database = require("../helpers/database");

var Admin = database.define("admin", {

 
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
 
});

Admin.sync({ alter: true }, (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log("User table created");
  }
});

module.exports = Admin;