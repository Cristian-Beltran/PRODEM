import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { Remesa } from "./Remesa.js";

export const Bag = sequelize.define("bags", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  serial: {
    type: DataTypes.STRING,
    requierd: true,
  },
  amount: {
    type: DataTypes.FLOAT,
    required: true,
  },
  voBoParcial: {
    type: DataTypes.STRING,
  },
  type: {
    type: DataTypes.STRING,
    required: true,
  },
  others: {
    type: DataTypes.STRING,
  },
});

Remesa.hasMany(Bag, {
  foreignKey: "remesaId",
  sourceKey: "id",
});

Bag.belongsTo(Remesa, {
  foreignKey: "remesaId",
  targetKey: "id",
});
