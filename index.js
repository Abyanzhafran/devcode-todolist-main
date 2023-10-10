const express = require("express");
const app = express();
const cors = require("cors");
const activityRouter = require("./router/activity");
const todoRouter = require("./router/todo");
const migration = require("./config/migration");

app.use(express.urlencoded({ extended: true }));
// enable cors for all request
app.use(cors());

// enable middleware
app.use(express.json());

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  res.status(err.statusCode).json({
    message: err.message,
  });
});

app.get("/", (req, res) => {
  res.status(200).send("Welcome, helloowww");
});
app.use("/activity-groups", activityRouter);
app.use("/todo-items", todoRouter);

const PORT = parseInt(process.env.PORT) || 3030;
const HOST = process.env.HOST || "localhost";

const runApp = async () => {
  await migration();

  app.listen(PORT, () => {
    console.log(`App listening on http://${HOST}:${PORT}/`);
    console.log("Press Ctrl+C to quit.");
  });
};

runApp();
