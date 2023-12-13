import { Sequelize } from "sequelize";
import sequelize from "../config/dbconfig.js";

const User = sequelize.define("User", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  Name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Role: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default User;
