const { check } = require("express-validator");

exports.validateTodoPost = [
  check("activity_group_id")
    .notEmpty()
    .withMessage("activity_group_id cannot be null"),
  check("title").notEmpty().withMessage("title cannot be null"),
];
