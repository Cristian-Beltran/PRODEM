import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { Vehicle } from "./Vehicle.js";
import { Driver } from "./User.js";

export const Fueling = sequelize.define("fuelings", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nInvoce: {
    type: DataTypes.STRING,
    require: true,
  },
  partialFull: {
    type: DataTypes.STRING,
    require: true,
  },
  kmStart: {
    type: DataTypes.INTEGER,
    require: true,
  },
  kmEnd: {
    type: DataTypes.INTEGER,
    require: true,
  },
  price: {
    type: DataTypes.FLOAT,
    require: true,
  },
  liters: {
    type: DataTypes.FLOAT,
    require: true,
  },
  fuelType: {
    type: DataTypes.STRING,
    require: true,
  },
  typeOfRoad: {
    type: DataTypes.STRING,
    require: true,
  },
  obvservations: {
    type: DataTypes.TEXT,
  },
});

Vehicle.hasMany(Fueling, {
  foreignKey: "vehicleId",
  sourceKey: "id",
});

Fueling.belongsTo(Vehicle, {
  foreignKey: "vehicleId",
  targetKey: "id",
  allowNull: false,
});

Driver.hasMany(Fueling, {
  foreignKey: "driverId",
  sourceKey: "id",
});

Fueling.belongsTo(Driver, {
  foreignKey: "driverId",
  targetKey: "id",
  allowNull: false,
});
