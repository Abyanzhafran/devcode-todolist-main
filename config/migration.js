const db = require("../config/database");

const migration = async () => {
  try {
    await db.query(
      `
        CREATE TABLE IF NOT EXISTS activities (
          activity_id int NOT NULL AUTO_INCREMENT,
          title varchar(255) NOT NULL,
          email varchar(255) NOT NULL,
          created_at datetime NOT NULL DEFAULT current_timestamp(),
          primary key (activity_id)
        )
      `
    );

    await db.query(
      `
        CREATE TABLE IF NOT EXISTS todos (
          todo_id int NOT NULL AUTO_INCREMENT,
          activity_group_id varchar(255) NOT NULL,
          title varchar(255) NOT NULL,
          priority varchar(255) NOT NULL,
          created_at datetime NOT NULL DEFAULT current_timestamp(),
          primary key (todo_id)
        )
      `
    );
  } catch (error) {
    throw error;
  }
};

module.exports = migration;
