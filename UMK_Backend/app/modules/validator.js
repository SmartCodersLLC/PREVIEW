const { Validator } = require("jsonschema");

const validate = (data, schema) => {
  return new Validator().validate(data, schema).valid;
};

module.exports = validate;
