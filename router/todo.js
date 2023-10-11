const express = require("express");
const router = express.Router();
const todoValidator = require("../validators/todoValidator");
const {
  getAll,
  getByGroupId,
  getById,
  addTodo,
  deleteById,
  updateById,
} = require("../controllers/todoController");

router.get("/activity-test", (req, res) => {
  res.send("hellow todosss");
});

// prioritize problem in here
router.get("/", getAll);

router.get("/:todo_id", getById);

router.post("/", todoValidator.validateTodoPost, addTodo);

router.delete("/:todo_id", deleteById);

router.patch("/:todo_id", updateById);

module.exports = router;
