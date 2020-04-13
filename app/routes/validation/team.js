const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateTeamInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.division = !isEmpty(data.division) ? data.division : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.phonenumber = !isEmpty(data.phonenumber) ? data.phonenumber : "";
  data.webpage = !isEmpty(data.webpage) ? data.webpage : "";
  data.value = !isEmpty(data.value) ? data.value : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  }

  if (Validator.isEmpty(data.division)) {
    errors.division = "Division is required";
  }

  if (Validator.isEmpty(data.address)) {
    errors.address = "Address is required";
  }

  if (Validator.isEmpty(data.phonenumber)) {
    errors.phonenumber = "Phone number is required";
  }

  if (Validator.isEmpty(data.webpage)) {
    errors.webpage = "Webpage is required";
  }

  if (!isEmpty(data.webpage)) {
    if (!Validator.isURL(data.webpage)) {
      errors.webpage = "Not a valid URL";
    }
  }

  if (Validator.isEmpty(data.value)) {
    errors.value = "Value is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
