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

export const Maintenance = sequelize.define("maintenances", {
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

TypeMaintenances.hasMany(Maintenance, {
  foreignKey: "typeMaintenanceId",
  sourceKey: "id",
});

Maintenance.belongsTo(TypeMaintenances, {
  foreignKey: "typeMaintenanceId",
  targetKey: "id",
  allowNull: false,
});

Vehicle.hasMany(Maintenance, {
  foreignKey: "vehicleId",
  sourceKey: "id",
});

Maintenance.belongsTo(Vehicle, {
  foreignKey: "vehicleId",
  targetKey: "id",
  allowNull: false,
});
