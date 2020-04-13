const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  team: {
    type: Object,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
  goals: {
    type: Number,
    required: true,
  },
  mins: {
    type: Number,
    required: true,
  },
  ycard: {
    type: Number,
    required: true,
  },
  num: {
    type: Number,
    required: true,
  },
});

module.exports = Player = mongoose.model("player", PlayerSchema);
