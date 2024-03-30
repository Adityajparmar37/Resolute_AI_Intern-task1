const jwt = require("jsonwebtoken");
const handler = require("express-async-handler");

const authMid = handler(
  async (req, res, next) => {
    const token = req.headers.access_token;

    if (!token) return res.status(401).send();

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_KEY
      );
      console.log(decoded);
      req.user = decoded;
      next();
    } catch (error) {
      console.log(
        "AuthMiddleware backend ==> ",
        error
      );
      return res.status(401).send("Unauthorized");
    }
  }
);

module.exports = authMid;
