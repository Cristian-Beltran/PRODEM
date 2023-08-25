import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { Vehicle } from "./Vehicle.js";

export const TypeMaintenances = sequelize.define("typeMaintenances", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    require: true,
  },
  detail: {
    type: DataTypes.TEXT,
  },
});

export const Maintenances = sequelize.define("maintenances", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nInvoce: {
    type: DataTypes.STRING,
    require: true,
  },
  detail: {
    type: DataTypes.TEXT,
    require: true,
  },
  amount: {
    type: DataTypes.DOUBLE,
    require: true,
  },
});

TypeMaintenances.hasMany(Maintenances, {
  foreignKey: "typeMaintenanceId",
  sourceKey: "id",
});

Maintenances.belongsTo(TypeMaintenances, {
  foreignKey: "typeMaintenanceId",
  targetKey: "id",
  allowNull: false,
});

Vehicle.hasMany(Maintenances, {
  foreignKey: "vehicleId",
  sourceKey: "id",
});

Maintenances.belongsTo(Vehicle, {
  foreignKey: "vehicleId",
  targetKey: "id",
  allowNull: false,
});
