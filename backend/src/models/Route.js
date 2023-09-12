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
  },
  kmEnd: {
    type: DataTypes.INTEGER,
  },
  complete: {
    type: DataTypes.BOOLEAN,
    default: false,
  },
});

// guard 1
User.hasMany(Route, {
  foreignKey: "guard1",
  sourceKey: "id",
});

Route.belongsTo(User, {
  foreignKey: "guard1",
  as: "Guard1",
  targetKey: "id",
});
// Guard 2
User.hasMany(Route, {
  foreignKey: "guard2",
  sourceKey: "id",
});

Route.belongsTo(User, {
  foreignKey: "guard2",
  as: "Guard2",
  targetKey: "id",
});

// carrier 1
User.hasMany(Route, {
  foreignKey: "carriesValue1",
  sourceKey: "id",
});

Route.belongsTo(User, {
  foreignKey: "carriesValue1",
  as: "CarriesValue1",
  targetKey: "id",
});
// carrier 2
User.hasMany(Route, {
  foreignKey: "carriesValue2",
  sourceKey: "id",
});

Route.belongsTo(User, {
  foreignKey: "carriesValue2",
  as: "CarriesValue2",
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
