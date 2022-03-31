const jwt = require("../helpers/jwt");
const Admin = require("../models/Admin");
const express = require("express");
const Password = require("../helpers/password");
const router = express.Router();
const nodemailer = require("nodemailer");
const verifyToken = require("../middleware/verify");

//create an express route that will create a new user according to the user model
router.post("/admin/register", async (req, res) => {
  try {
    //check if the user already exists
    const checkUser = await Admin.findOne({
      where: {
        email: req.body.email,
      },
    });

    console.log(checkUser);

    if (checkUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const password = req.body.password;
    const hashedPassword = await Password.hashPassword(password);
    req.body.password = hashedPassword;
    const admin = await Admin.create(req.body);
    res.status(201).send(admin);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.post("/admin/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const admin = await Admin.findOne({
        where: {
          email: email,
        },
      });
      console.log("🚀 ~ file: users.js ~ line 46 ~ router.post ~ register", admin);
      if (!admin) {
        return res.status(401).send({ error: "User not found" });
      }
  
      const verifyPassword = await Password.verifyPassword(
        password,
        admin.password
      );
  
      if (!verifyPassword) {
        return res.status(401).send({ error: "Invalid password" });
      }
  
      const token = jwt.generateToken({ id: admin.id });
      res.send({ admin, token });
    } catch (e) {
      res.status(400).send(e.message);
    }
  });

  module.exports = router;
