const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const post__Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default: "NO Image",
  },
  postedBy: {
    type: ObjectId,
    ref: "User",
  },
});

mongoose.model("Post", post__Schema);
