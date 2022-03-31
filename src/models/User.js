const { DataTypes } = require("sequelize");
const database = require("../helpers/database");

var User = database.define("userr", {

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
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  mobile: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  block: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
 
});

User.sync({ alter: true }, (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log("User table created");
  }
});

module.exports = User;