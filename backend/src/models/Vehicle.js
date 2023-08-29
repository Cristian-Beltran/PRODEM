import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { Driver } from "./User.js";

export const Vehicle = sequelize.define("vehicles", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  plate: {
    type: DataTypes.STRING,
    require: true,
  },
  model: {
    type: DataTypes.STRING,
    require: true,
  },
  photo: {
    type: DataTypes.STRING,
  },
});

Driver.hasOne(Vehicle, {
  foreignKey: "driverId",
  sourceKey: "id",
});

Vehicle.belongsTo(Driver, {
  foreignKey: "driverId",
  targetKey: "id",
  allowNull: false,
  unique: true,
});
