import Sequelize from "sequelize";

export const sequelize = new Sequelize("prodem", "postgres", "holamundo1", {
  host: "localhost",
  dialect: "postgres",
  timezone: "-04:00",
});
sequelize.options.logging = false;
