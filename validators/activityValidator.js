const { check } = require("express-validator");

exports.validateActivityPost = [
  check("title").notEmpty().withMessage("Title cannot be null"),
  check("email").isEmail().withMessage("Invalid email address"),
];
