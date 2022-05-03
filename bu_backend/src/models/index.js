const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.PORT,
  // operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.bu = require("./bu.model.js")(sequelize, Sequelize);

console.log("sequelize.authenticate()")
sequelize.authenticate().then(() => {
  // DROP DB WHEN THERE ARE CHANGES TO THE MODEL
  console.log("Success!");
  // db.sequelize.sync().then(() => {
  //   console.log("Sync db without droping.");
  // });
  db.sequelize.sync({force: true}).then(() => {
    console.log("Drop and re-sync db.");
  });
}).catch((err) => {
  console.log(err);
});

module.exports = db;