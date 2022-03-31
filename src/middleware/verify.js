//create a middleware tht verifies json web tokens
const config = require("../config");
const jwt = require("../helpers/jwt");

//verify token
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    console.log(bearerToken === "null");

    if (bearerToken === "null") {
      return res.redirect("/login");
    }

    const data = jwt.verifyToken(bearerToken, config.secret);
    console.log(data);
    req.id = data.id;
    next();
  } else {
    res.sendStatus(403);
  }
};

module.exports = verifyToken;