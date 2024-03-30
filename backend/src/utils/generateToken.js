const jwt = require("jsonwebtoken");

const generateToken = (id, name, email) => {
  return jwt.sign(
    { id, name, email },
    process.env.JWT_KEY,
    {
      expiresIn: "30d",
    }
  );
};

module.exports = generateToken;
