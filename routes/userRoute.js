const express = require("express");
const {
  registerUserController,
  loginUserController,
} = require("../controllers/userController");

const userRoute = express.Router();

userRoute.post("/register", registerUserController);
userRoute.post("/login", loginUserController);

module.exports = userRoute;
