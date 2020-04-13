const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePlayerInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.team = !isEmpty(data.team) ? data.team : "";
  data.birthDate = !isEmpty(data.birthDate) ? data.birthDate : "";
  data.post = !isEmpty(data.post) ? data.post : "";
  data.goals = !isEmpty(data.goals) ? data.goals : "";
  data.mins = !isEmpty(data.mins) ? data.mins : "";
  data.ycard = !isEmpty(data.ycard) ? data.ycard : "";
  data.num = !isEmpty(data.num) ? data.num : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  }

  if (Validator.isEmpty(data.team)) {
    errors.team = "Team is required";
  }

  if (Validator.isEmpty(data.birthDate)) {
    errors.birthDate = "Birthday is required";
  }

  if (Validator.isEmpty(data.post)) {
    errors.post = "Post is required";
  }

  if (Validator.isEmpty(data.goals)) {
    errors.goals = "Goals is required";
  }

  if (Validator.isEmpty(data.mins)) {
    errors.mins = "2 min penalties is required";
  }

  if (Validator.isEmpty(data.ycard)) {
    errors.ycard = "Yellow cards is required";
  }

  if (Validator.isEmpty(data.num)) {
    errors.num = "Number is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
