// create a class that will generate and verify jwt tokens
const jwt = require("jsonwebtoken");
const config = require("../config");

class Jwt {
  constructor() {
    this.secret = config.secret;
  }

  // generate a token
  generateToken(data) {
    return jwt.sign(data, config.secret);
  }

  // verify a token
  verifyToken(token) {
    return jwt.verify(token, config.secret);
  }
}

module.exports = new Jwt();
