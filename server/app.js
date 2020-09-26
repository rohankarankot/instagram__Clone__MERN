const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 5000;

const { MONGOURI } = require("./keys");

mongoose.connect(MONGOURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongoose");
});

mongoose.connection.on("error", (err) => {
  console.log("error", err);
});

require("./modals/user");
require("./modals/post");

app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));

app.listen(PORT, () => {
  console.log("server runnning", PORT);
});
