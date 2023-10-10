const { validationResult } = require("express-validator");
const db = require("../config/database");

const getTodoForResponse = async (todo_id) => {
  try {
    return await db.query(`SELECT * FROM todos WHERE todo_id=${todo_id}`);
  } catch (error) {
    console.log(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const [todos] = await db.query("SELECT * FROM todos");

    const mappedTodos = todos.map((todo) => {
      return {
        id: todo.todo_id,
        activity_group_id: todo.activity_group_id,
        title: todo.title,
        is_active: "1",
        priority: todo.priority,
        created_at: todo.created_at,
        updated_at: todo.created_at,
        deleted_at: null,
      };
    });

    res.status(200).send({
      status: "Success",
      message: "Success",
      data: mappedTodos,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getByGroupId = async (req, res, next) => {
  const activity_group_id = req.query.activity_group_id;
  console.log("log : ", activity_group_id);

  try {
    const [todo] = await db.query(
      `SELECT * FROM todos WHERE activity_group_id=${activity_group_id}`
    );

    if (todo.length === 0) {
      return res.status(404).json({
        status: "Not Found",
        message: `Todo with ID ${activity_group_id} Not Found`,
      });
    }

    const mappedTodos = todo.map((todo) => {
      return {
        id: todo.todo_id,
        activity_group_id: todo.activity_group_id,
        title: todo.title,
        is_active: "1",
        priority: todo.priority,
        created_at: todo.created_at,
        updated_at: todo.created_at,
        deleted_at: null,
      };
    });

    res.status(200).send({
      status: "Success",
      message: "Success",
      data: mappedTodos,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getById = async (req, res, next) => {
  const todo_id = req.params.todo_id;

  try {
    const [todo] = await db.query(`
            SELECT * FROM todos WHERE todo_id=${todo_id}  
        `);

    if (todo.length === 0) {
      return res.status(404).send({
        status: "Not Found",
        message: `Todo with ID ${todo_id} Not Found`,
      });
    }

    const mappedTodos = todo.map((todo) => {
      return {
        id: todo.todo_id,
        activity_group_id: todo.activity_group_id,
        title: todo.title,
        is_active: "1",
        priority: todo.priority,
        created_at: todo.created_at,
        updated_at: todo.created_at,
        deleted_at: null,
      };
    });

    res.status(200).send({
      status: "Success",
      message: "Success",
      data: mappedTodos,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const addTodo = async (req, res, next) => {
  try {
    const validate = validationResult(req);

    if (validate.errors.length !== 0) {
      return res.status(404).send({
        status: "Bad Request",
        message: validate.errors[0].msg,
        data: {},
      });
    }

    const { activity_group_id, title } = req.body;

    priority = "very-high";

    const [result] = await db.query(
      "INSERT INTO `todos` (activity_group_id, title, priority) VALUES (?, ?, ?)",
      [activity_group_id, title, priority]
    );
    const todo = await getTodoForResponse(result.insertId);

    const mappedTodos = todo[0].map((todo) => {
      return {
        created_at: todo.created_at,
        updated_at: todo.created_at,
        id: todo.todo_id,
        title: todo.title,
        activity_group_id: todo.activity_group_id,
        is_active: "true",
        priority: todo.priority,
      };
    });

    res.status(201).send({
      status: "Success",
      message: "Success",
      data: mappedTodos[0],
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const todo_id = req.params.todo_id;

    const [result] = await db.query("DELETE FROM `todos` WHERE todo_id=?", [
      todo_id,
    ]);

    if (result.affectedRows) {
      return res.status(200).json({
        status: "Success",
        message: "Success",
        data: {},
      });
    }

    return res.status(404).json({
      status: "Not Found",
      message: `Todo with ID ${todo_id} Not Found`,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const todo_id = req.params.todo_id;
    const data = req.body;
    const [todo] = await db.query(`
      SELECT * FROM todos WHERE todo_id=${todo_id}
    `);

    if (todo.length === 0) {
      res.status(404).send({
        status: "Not Found",
        message: `Todo with ID ${todo_id} Not Found`,
      });
    }

    const currentDateTime = new Date();
    const activity_group_id =
      data.activity_group_id || todo[0].activity_group_id;
    const title = data.title || todo[0].title;

    const readyToUpdate = await db.query(
      "UPDATE `todos` SET `activity_group_id`=?, `title`=? WHERE `todo_id`=?",
      [activity_group_id, title, todo_id]
    );

    const mappedTodo = todo.map((todo) => {
      return {
        id: todo.todo_id,
        activity_group_id: todo.activity_group_id,
        title: todo.title,
        is_active: "1",
        priority: "very-high",
        created_at: todo.created_at,
        updated_at: currentDateTime.toISOString(),
        deleted_at: null,
      };
    });

    if (readyToUpdate[0].affectedRows) {
      return res.status(200).json({
        status: "Success",
        message: "Success",
        data: mappedTodo[0],
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  getAll,
  getByGroupId,
  getById,
  addTodo,
  deleteById,
  updateById,
};
