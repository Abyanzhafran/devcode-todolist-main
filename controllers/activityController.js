const { validationResult } = require("express-validator");
const db = require("../config/database");

const getActivityForResponse = async (activity_id) => {
  try {
    return await db.query(
      `SELECT * FROM activities WHERE activity_id=${activity_id}`
    );
  } catch (error) {
    console.log(error);
  }
};

const getAll = async (req, res) => {
  try {
    const [activities] = await db.query("SELECT * FROM activities");

    const mappedActivities = activities.map((activity) => {
      return {
        id: activity.activity_id,
        email: activity.email,
        title: activity.title,
        created_at: activity.created_at,
        updated_at: activity.created_at,
        deleted_at: null,
      };
    });

    res.status(200).send({
      status: "Success",
      message: "Success",
      data: mappedActivities,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getById = async (req, res, next) => {
  const activity_id = req.params.activity_id;

  try {
    const [activity] = await db.query(
      `SELECT * FROM activities WHERE activity_id=${activity_id}`
    );

    if (activity.length === 0) {
      return res.status(404).json({
        status: "Not Found",
        message: `Activity with ID ${activity_id} Not Found`,
      });
    }

    const mappedActivities = activity.map((activity) => {
      return {
        id: activity.activity_id,
        email: activity.email,
        title: activity.title,
        created_at: activity.created_at,
        updated_at: activity.created_at,
        deleted_at: null,
      };
    });

    res.status(200).send({
      status: "Success",
      message: "Success",
      data: mappedActivities,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const addActivity = async (req, res, next) => {
  try {
    const validate = validationResult(req);

    if (validate.errors.length !== 0) {
      return res.status(404).send({
        status: "Bad Request",
        message: validate.errors[0].msg,
        data: {},
      });
    }

    const { title, email } = req.body;

    const [result] = await db.query(
      "INSERT INTO `activities` (`title`, `email`) VALUES (?, ?)",
      [title, email]
    );
    const activity = await getActivityForResponse(result.insertId);

    const mappedActivities = activity[0].map((activity) => {
      return {
        created_at: activity.created_at,
        updated_at: activity.created_at,
        id: activity.activity_id,
        title: activity.title,
        email: activity.email,
      };
    });

    res.status(201).send({
      status: "Success",
      message: "Success",
      data: mappedActivities,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const activity_id = req.params.activity_id;

    const [result] = await db.query(
      "DELETE FROM `activities` WHERE `activity_id`=?",
      [activity_id]
    );

    if (result.affectedRows) {
      return res.status(200).json({
        status: "Success",
        message: "Success",
        data: {},
      });
    }

    return res.status(404).json({
      status: "Not Found",
      message: `Activity with ID ${activity_id} Not Found`,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const activity_id = req.params.activity_id;
    const data = req.body;
    const [activity] = await db.query(
      `SELECT * FROM activities WHERE activity_id=${activity_id}`
    );

    if (activity.length === 0) {
      return res.status(404).send({
        status: "Not Found",
        message: `Activity with ID ${activity_id} Not Found`,
      });
    }

    const currentDateTime = new Date();
    const title = data.title || activity[0].title;
    const email = data.email || activity[0].email;

    const readyToUpdate = await db.query(
      "UPDATE `activities` SET `title`=?, `email`=? WHERE `activity_id`=?",
      [title, email, activity_id]
    );

    const mappedActivity = activity.map((activity) => {
      return {
        id: activity.activity_id,
        title: title,
        email: email,
        created_at: activity.created_at,
        updated_at: currentDateTime.toISOString(),
        deleted_at: null,
      };
    });

    if (readyToUpdate[0].affectedRows) {
      return res.status(200).json({
        status: "Success",
        message: "Success",
        data: mappedActivity[0],
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  addActivity,
  deleteById,
  updateById,
};
