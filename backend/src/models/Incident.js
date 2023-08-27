import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Incident = sequelize.define("incidents", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  status: {
    type: DataTypes.BOOLEAN,
    default: false,
  },
  priority: {
    // alta baja media
    type: DataTypes.STRING,
    required: true,
  },
  description: {
    type: DataTypes.TEXT,
    required: true,
  },
  informedBy: {
    type: DataTypes.STRING,
    required: true,
  },
  assignedTo: {
    type: DataTypes.STRING,
  },
  completedAt: {
    type: DataTypes.DATE,
  },
  comments: {
    type: DataTypes.STRING,
  },
});
