const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  division: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
    required: true,
  },
  webpage: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

module.exports = Team = mongoose.model("team", TeamSchema);
