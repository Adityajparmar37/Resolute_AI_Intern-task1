const express = require("express");
const router = express.Router();
const handler = require("express-async-handler");
const errorHandler = require("../middlewares/errorMiddleware.js");
const User = require("../model/userModel.js");
const generateToken = require("../utils/generateToken.js");

//login endpoint
router.post(
  "/login",
  handler(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const checkUser = await User.findOne({
        email,
      });

      if (!checkUser)
        return next(
          errorHandler(404, "User not found ")
        );

      if (
        checkUser &&
        (await checkUser.matchPassword(password))
      ) {
        res.json({
          _id: checkUser._id,
          name: checkUser.name,
          email: checkUser.email,
          token: generateToken(
            checkUser._id,
            checkUser.name,
            checkUser.email
          ),
          success: true,
        });
      } else {
        next(
          errorHandler(401, "Wrong Credentials")
        );
      }
    } catch (error) {
      next(error);
    }
  })
);

//signup endpoint
router.post(
  "/signup",
  handler(async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        next(
          errorHandler(
            400,
            "Please fill all required fields"
          )
        );
      }

      if (password.length < 6) {
        console.log(password.length);
        next(
          errorHandler(
            400,
            "Password must be at least 6 characters"
          )
        );
      }

      //find user
      const userExits = await User.findOne({
        email,
      });

      if (userExits) {
        next(
          errorHandler(400, "User Already exist")
        );
      }

      const newUser = await User.create({
        name,
        email,
        password,
      });

      if (newUser) {
        res.status(201).json({
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          token: generateToken(
            newUser._id,
            newUser.name,
            newUser.email
          ),
          success: true,
        });
      } else {
        next(
          errorHandler(
            400,
            "Something Went Wrong !"
          )
        );
      }
    } catch (error) {
      next(error);
    }
  })
);

module.exports = router;
