const express = require("express");

const mongoose = require("mongoose");
const router = express.Router();

const requireLogin = require("../middleWares/requireLogin");

router.post("/createpost", requireLogin, (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) {
    return res.status(422).json({ error: "Please add all fields" });
  }

  console.log(req.user);
  res.send("ok posted");

  //   const post = new Post({
  //     title,
  //     body,
  //     postedBy
  //   });
});

module.exports = router;
