//create a sequelize model which has fields id, description, price, image, name

const database = require("../helpers/database");
const Sequelize = require("sequelize");

const Add = database.define("rental", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  propertytype: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  bedrooms: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },

  bathrooms: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  discription: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  image: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  feature: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },

 
});


Add.sync({ alter: true }, (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log("User table created");
  }
});

module.exports = Add;
