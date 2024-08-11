import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

import { initializeUser } from "./User.js";
import { initializeBite } from "./Bite.js";
import { initializeBot } from "./Bot.js";

const db = {};

const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: "postgres",
  logging: false,
});

db.User = initializeUser(sequelize);
db.Bite = initializeBite(sequelize);
db.Bot = initializeBot(sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const associateModels = () => {
  // User to Bot association
  db.User.hasMany(db.Bot, {
    foreignKey: "user_id",
    as: "bots",
  });
  db.Bot.belongsTo(db.User, {
    foreignKey: "user_id",
    as: "user",
  });

  db.User.hasMany(db.Bite, {
    foreignKey: "user_id",
    as: "bites",
  });
  db.Bite.belongsTo(db.User, {
    foreignKey: "user_id",
    as: "user",
  });
};

associateModels();

export default db;
