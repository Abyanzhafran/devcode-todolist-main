const express = require("express");
const router = express.Router();
const activityValidator = require("../validators/activityValidator");
const {
  getAll,
  getById,
  addActivity,
  deleteById,
  updateById,
} = require("../controllers/activityController");

router.get("/activity-test", (req, res) => {
  res.send("hellow");
});

router.get("/", getAll);

router.get("/:activity_id", getById);

router.post("/", activityValidator.validateActivityPost, addActivity);

router.delete("/:activity_id", deleteById);

router.patch(
  "/:activity_id",
  activityValidator.validateActivityPost,
  updateById
);

module.exports = router;
