const express = require("express");
const router = express.Router();
const handler = require("express-async-handler");
const errorHandler = require("../middlewares/errorMiddleware.js");
const User = require("../model/userModel.js");
const generateToken = require("../utils/generateToken.js");
const authMid = require("../middlewares/authMiddleware.js");

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

      if (password.length < 5) {
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

router.put(
  "/profileUpdate",
  authMid,
  handler(async (req, res, next) => {
    try {
      const formData = req.body;
      const userId = req.user.id;
      console.log(formData);

      const existingProfile = await User.findById(
        userId
      );

      if (!existingProfile) {
        console.log(error);
        return next(
          errorHandler(
            404,
            "Profile not found, please try again!"
          )
        );
      }

      if (formData.password) {
        console.log(formData.password);
        const salt = await bcrypt.genSalt(10);
        formData.password = await bcrypt.hash(
          formData.password,
          salt
        );
      }

      const updatedProfile =
        await User.findByIdAndUpdate(
          userId,
          formData,
          { new: true }
        );

      console.log(updatedProfile);
      res.json({
        updatedProfile,
        update: true,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
);

router.get(
  "/all",
  handler(async (req, res, next) => {
    try {
      const getAllUser = await User.find({});

      if (getAllUser) {
        res.send(getAllUser);
      } else {
        next(errorHandler(404, "No User !"));
      }
    } catch {}
  })
);

router.delete(
  "/delete/:id",
  authMid,
  handler(async (req, res, next) => {
    try {
      const { id } = req.params;
      const UserToDelete =
        await User.findByIdAndDelete(id);

      if (!UserToDelete) {
        return next(
          errorHandler(404, "User not found")
        );
      }

      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
);

module.exports = router;
