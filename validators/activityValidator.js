const { check } = require("express-validator");

exports.validateActivityPost = [
  check("title").notEmpty().withMessage("title cannot be null"),
  check("email"),
];
