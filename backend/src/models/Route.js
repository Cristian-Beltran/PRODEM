import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { Driver, User } from "./User.js";
import { Vehicle } from "./Vehicle.js";

export const Route = sequelize.define("routes", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  kmStart: {
    type: DataTypes.INTEGER,
    requierd: true,
  },
  kmEnd: {
    type: DataTypes.INTEGER,
    required: true,
  },
});

// guard 1
User.hasMany(Route, {
  foreignKey: "guard1",
  sourceKey: "id",
});

Route.belongsTo(User, {
  foreignKey: "guard1",
  targetKey: "id",
});
// Guard 2
User.hasMany(Route, {
  foreignKey: "guard2",
  sourceKey: "id",
});

Route.belongsTo(User, {
  foreignKey: "guard2",
  targetKey: "id",
});
// driver
Driver.hasMany(Route, {
  foreignKey: "driverId",
  sourceKey: "id",
});

Route.belongsTo(Driver, {
  foreignKey: "driverId",
  targetKey: "id",
});
// vehicle
Vehicle.hasMany(Route, {
  foreignKey: "vehicleId",
  sourceKey: "id",
});

Route.belongsTo(Vehicle, {
  foreignKey: "vehicleId",
  targetKey: "id",
});