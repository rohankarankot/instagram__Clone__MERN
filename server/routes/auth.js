const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");

const requireLogin = require("../middleWares/requireLogin");

router.get("/protected", requireLogin, (req, res) => {
  res.send("proctected acced hello user");
});

router.post("/signup", (req, res) => {
  const { name, password, email } = req.body;

  if (!name || !email || !password) {
    return res.status(422).json({ error: "please add all fields" });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(422).json({ error: "User already Exist in db" });
      } else {
        bcrypt.hash(password, 12).then((hashed__Password) => {
          const user = new User({
            email,
            password: hashed__Password,
            name,
          });
          user.save().then((user) => {
            res.json({
              message: "saved user Successfully",
            });
          });
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({
      error: "fields cannot be empty",
    });
  }
  User.findOne({ email: email }).then((saved__User) => {
    if (!saved__User) {
      return res.status(422).json({ error: "Invalid email or password" });
    }
    bcrypt
      .compare(password, saved__User.password)
      .then((do__Match) => {
        if (do__Match) {
          const token = jwt.sign({ _id: saved__User._id }, JWT_SECRET);

          res.json({ token });
        } else {
          res.status(422).json({
            error: "Invalid email or password",
          });
        }
      })
      .then((err) => {
        console.log("error");
      });
  });
});

module.exports = router;
