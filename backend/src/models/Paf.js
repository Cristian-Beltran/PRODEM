import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { User } from "./User.js";

export const Paf = sequelize.define("pafs", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    requierd: true,
  },
  lat: {
    // alta baja media
    type: DataTypes.STRING,
    required: true,
  },
  log: {
    // alta baja media
    type: DataTypes.STRING,
    required: true,
  },
  address: {
    // alta baja media
    type: DataTypes.STRING,
    required: true,
  },
  type: {
    type: DataTypes.STRING,
    required: true,
  },
});

User.hasOne(Paf, {
  foreignKey: "userId",
  sourceKey: "id",
});

Paf.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "id",
  allowNull: false,
  unique: true,
});
