const jwt = require("../helpers/jwt");
const User = require("../models/User");
const express = require("express");
const Password = require("../helpers/password");
const router = express.Router();
const nodemailer = require("nodemailer");
const verifyToken = require("../middleware/verify");

//create an express route that will create a new user according to the user model
router.post("/userr/register", async (req, res) => {
  try {
    //check if the user already exists
    const checkUser = await User.findOne({
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
    const userr = await User.create(req.body);
    res.status(201).send(userr);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.post("/userr/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const userr = await User.findOne({
        where: {
          email: email,
        },
      });
      console.log("🚀 ~ file: users.js ~ line 46 ~ router.post ~ register", userr);
      if (!userr) {
        return res.status(401).send({ error: "User not found" });
      }

      if(userr.block === 1){
        alert("You are blocked by the admin Please Contact the Admin");

      }


      
  
      const verifyPassword = await Password.verifyPassword(
        password,
        userr.password
      );
  
      if (!verifyPassword) {
        return res.status(401).send({ error: "Invalid password" });
      }
  
      const token = jwt.generateToken({ id: userr.id });
      res.send({ userr, token });
    } catch (e) {
      res.status(400).send(e.message);
    }
  });

  router.get("/users/list", async (req, res) => {
    try {
      const users = await User.findAll();
      res.send(users);
    } catch (e) {
      res.status(400).send(e.message);
    }
  });


  //create a route to update user details

  router.get("/userr", verifyToken, async (req, res) => {
    try {
      const userr = await User.findOne({
        where: {
          id: req.id,
        },
      });
  
      if (!userr) {
        return res.status(401).send({ error: "User not found" });
      }
  
      res.send(userr);
    } catch (e) {
      res.status(400).send(e.message);
    }
  });
  
  //create a route to update user details
  router.post("/userr/update", verifyToken, async (req, res) => {
    try {
      const { firstName, lastName, mobile, email} = req.body;
      //const file = req.files;
     // console.log(file);
      const userr = await User.findOne({
        where: {
          id: req.id,
        },
      });
  
     /* const image = await uploadImage({
        originalname: file.file.name,
        buffer: file.file.data,
      });
  
      console.log(image);
  */
      if (!userr) {
        return res.status(401).send({ error: "User not found" });
      }
  
      await User.update(
        {
          firstName: firstName,
          lastName :lastName,
          mobile: mobile,
          email: email,
          
          //profileImage: image,
        },
        {
          where: {
            id: req.id,
          },
        }
      );
  
      res.send({ message: "User updated successfully" });
    } catch (e) {
      res.status(400).send(e.message);
    }
  });

  router.post("/userr/block", async (req, res) => {
    try {
      const { id, isBlocked } = req.body;
      const userr = await User.findOne({
        where: {
          id: id,
        },
      });
      if (!userr) {
        return res.status(401).send({ error: "User not found" });
      }
  
      await User.update(
        {
          block: isBlocked,
        },
        {
          where: {
            id: id,
          },
        }
      );
  
      res.send({ message: "User blocked successfully" });
    } catch (e) {
      res.status(400).send(e.message);
    }
  });

 /* router.post("/userr/update1", async (req, res) => {
    try {
      //check if the user already exists
      const checkUser = await User.findOne({
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
      const userr = await User.create(req.body);
      res.status(201).send(userr);
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  });  */

  router.post("/userr/prime", async (req, res) => {
    try {
      const { id, prime } = req.body;
      const userr = await User.findOne({
        where: {
          id: id,
        },
      });
      if (!userr) {
        return res.status(401).send({ error: "User not found" });
      }
  
      await User.update(
        {
          prime: prime,
        },
        {
          where: {
            id: id,
          },
        }
      );
  
      res.send({ message: "User primed successfully" });
    } catch (e) {
      res.status(400).send(e.message);
    }
  });

  //create a route to send the email to user
router.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "yahoo",
      auth: {
        user: "vivudhprashar@yahoo.com",
        pass: "xhpuvswqiiwpukxb",
      },
    });

    const mailOptions = {
      from: "vivudhprashar@yahoo.com",
      to: email,
      subject: "Help request submitted successfully",
      text: message,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.send("Success");
  } catch (e) {
    res.status(400).send(e.message);
  }
});
  

module.exports = router;
