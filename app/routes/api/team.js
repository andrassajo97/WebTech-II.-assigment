const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");

const validateTeamInput = require("../validation/team");

const Team = require("../models/team");

// @route   POST /api/team/add
// @desc    Add a new team
// @access  Private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTeamInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Team.findOne({ name: req.body.name })
      .then((team) => {
        if (team) {
          errors.name = "Already in the database!";
          return res.status(400).json(errors);
        }
        const newTeam = {
          name: req.body.name,
          division: req.body.division,
          address: req.body.address,
          phonenumber: req.body.phonenumber,
          webpage: req.body.webpage,
          value: req.body.value,
        };
        new Team(newTeam)
          .save()
          .then((team) => res.json(team))
          .catch((err) => res.status(400).json(err));
      })
      .catch((err) => res.status(400).json(err));
  }
);

// @route   GET /api/team/
// @desc    List teams
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Team.find()
      .then((teams) => res.json(teams))
      .catch((err) => res.status(400).json("Error: " + err));
  }
);

// @route   GET /api/team/:id
// @desc    List team by id
// @access  Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Team.findById(req.params.id)
      .then((team) => res.json(team))
      .catch((err) => res.status(400).json("Error: " + err));
  }
);

// @route   POST /api/team/edit/:id
// @desc    Edit team
// @access  Private
router.post(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Team.findById(req.params.id)
      .then((team) => {
        team.name = req.body.name;
        team.division = req.body.division;
        team.address = req.body.address;
        team.phonenumber = req.body.phonenumber;
        team.webpage = req.body.webpage;
        team.value = req.body.value;

        team
          .save()
          .then(() => res.json(team))
          .catch((err) => res.status(400).json("Error: " + err));
      })
      .catch((err) => res.status(400).json("Error: " + err));
  }
);

// @route   DELETE /api/team/delete/:id
// @desc    Delete team
// @access  Private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Team.findByIdAndDelete(req.params.id)
      .then(() => res.json("Team deleted"))
      .catch((err) => res.status(400).json("Error: " + err));
  }
);

module.exports = router;
