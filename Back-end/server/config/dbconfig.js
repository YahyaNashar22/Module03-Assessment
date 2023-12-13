import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.USERNAME,
  process.env.PASSWORD,
  {
    host: "127.0.0.1",
    dialect: "mariadb",
    port: 3306,
  }
);

export const connect = async () => {
  try {
    await sequelize.authenticate({ force: true });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.log("Unable to connect to database", error);
  }
};

export const syncronise = async () => {
  try {
    await sequelize.sync().then((result) => {
      console.log(result);
    });
  } catch (err) {
    console.log(err);
  }
};

export default sequelize;
