const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");

const validatePlayerInput = require("../validation/player");

const Player = require("../models/player");

// @route   Post api/player/add
// @desc    Add player
// @access  Private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePlayerInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Player.findOne({ team: req.body.team, num: req.body.num })
      .then((player) => {
        if (player) {
          errors.num = "Team already has a player with that number!";
          return res.status(400).json(errors);
        }

        const newPlayer = {
          name: req.body.name,
          birthDate: req.body.birthDate,
          team: req.body.team,
          post: req.body.post,
          goals: req.body.goals,
          mins: req.body.mins,
          ycard: req.body.ycard,
          num: req.body.num,
        };

        new Player(newPlayer)
          .save()
          .then((player) => res.json(player))
          .catch((err) => res.status(400).json(err));
      })
      .catch((err) => res.status(400).json(err));
  }
);

// @route   GET api/player/:id
// @desc    Get player by id
// @access  Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Player.findById(req.params.id)
      .then((player) => res.json(player))
      .catch((err) => res.status(404).json("Player not found"));
  }
);

// @route   GET api/player/
// @desc    Get players
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Player.find()
      .then((players) => res.json(players))
      .catch((err) => res.status(400).json("Error: " + err));
  }
);

// @route   POST api/player/edit/:id
// @desc    Edit player
// @access  Private
router.post(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Player.findById(req.params.id)
      .then((player) => {
        player.name = req.body.name;
        player.team = req.body.team;
        player.birthDate = req.body.birthDate;
        player.post = req.body.post;
        player.goals = req.body.goals;
        player.mins = req.body.mins;
        player.ycard = req.body.ycard;
        player.num = req.body.num;

        player
          .save()
          .then(() => res.json(player))
          .catch((err) => res.status(400).json(err));
      })
      .catch((err) => res.status(400).json(err));
  }
);

// @route   DELETE api/player/delete/:id
// @desc    Delete player
// @access  Private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Player.findByIdAndDelete(req.params.id)
      .then(() => res.json("Player deleted"))
      .catch((err) => res.status(400).json(err));
  }
);

module.exports = router;
