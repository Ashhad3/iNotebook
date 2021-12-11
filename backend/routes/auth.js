const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "notes$saving$website";

//Route:1 will run on localhost:5000//api/auth/createuser  no login required
router.post(
  "/createuser",
  [
    // username must be an email
    body("name", "Please Enter a valid Name").isLength({ min: 3 }),
    body("email", "Please Enter a valid Email").isEmail(),
    // password must be at least 5 chars long
    body("password", "Password must be atleast of 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    //If there is error return bad request
    if (!errors.isEmpty()) {
      success = false;
      return res.status(400).json({ success, errors: errors.array() });
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      success = false;
      return res
        .status(400)
        .json({
          success,
          error: "Sorry a user with this email already exists",
        });
    }
    try {
     
      const salt = bcrypt.genSaltSync(10);
      const secPassword = bcrypt.hashSync(req.body.password, salt);
      //save data for new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
      });

      const data = {
        user: user.id,
      };
      const jwtdata = jwt.sign(data, JWT_SECRET);

      success = true;

      res.json({ success,jwtdata });
    } catch (error) {
      //If  some unknown has occur
      console.log({ error: error.message });
      res.status(500).send("Some internal error form server");
    }
  }
);

//Route:2 will run on localhost:5000//api/auth/login no login required
router.post(
  "/login",
  [
    // username must be an email
    body("email", "Please Enter a valid Email").isEmail(),
    // password must be at least 5 chars long
    body("password", "Please Enter correct password").exists(),
  ],
  async (req, res) => {
    //If there is error return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    let success = false;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ error: "Please enter correct information" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res
          .status(400)
          .json({ error: "Please enter correct information" });
      }
      const data = {
        user: { id: user.id },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      res.status(500).send("Some internal error form server");
    }
  }
);

//Route:3 will run on localhost:5000//api/auth/getuser --login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal error form server");
  }
});
module.exports = router;
