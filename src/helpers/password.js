// create a class that hashes a password and verifies a password against the hash

const bcrypt = require("bcrypt");

class Password {
  constructor() {}

  // hash a password
  static async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  // verify a password
  static async verifyPassword(password, hash) {
    return await bcrypt.compare(password, hash);
  }
}

module.exports = Password;
