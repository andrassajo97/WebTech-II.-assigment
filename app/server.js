const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const user = require("./routes/api/user");
const player = require("./routes/api/player");
const team = require("./routes/api/team");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(passport.initialize());

require("./config/passport")(passport);

app.use("/api/user", user);
app.use("/api/player", player);
app.use("/api/team", team);

const port = process.env.PORT || 5000;

app.listen(port, (req, res) =>
  console.log(`Server is running on port ${port}`)
);
