import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { User } from "./User.js";
import { Route } from "./Route.js";
import { Paf } from "./Paf.js";

export const Remesa = sequelize.define("remesa", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    requierd: true,
  },
  order: {
    type: DataTypes.STRING,
  },
  typeOfService: {
    type: DataTypes.STRING,
  },
  subType: {
    type: DataTypes.STRING,
  },
  senderDate: {
    type: DataTypes.DATE,
  },
  deadline: {
    type: DataTypes.DATE,
  },
  content: {
    type: DataTypes.STRING,
  }, // Billetes, monedas, cheques, otros
  others: {
    type: DataTypes.STRING,
  },
  observations: {
    type: DataTypes.TEXT,
  },
});

// Carries 1
User.hasMany(Remesa, {
  foreignKey: "carriesValue1",
  sourceKey: "id",
});

Remesa.belongsTo(User, {
  foreignKey: "carriesValue1",
  as: "CarriesValue1",
  targetKey: "id",
});

// Carries 2
User.hasMany(Remesa, {
  foreignKey: "carriesValue2",
  sourceKey: "id",
});

Remesa.belongsTo(User, {
  foreignKey: "carriesValue2",
  as: "CarriesValue2",
  targetKey: "id",
});

// Paf sender
Paf.hasMany(Remesa, {
  foreignKey: "sender",
  sourceKey: "id",
});

Remesa.belongsTo(Paf, {
  foreignKey: "sender",
  as: "Sender",
  targetKey: "id",
});
// Paf addressee
Paf.hasMany(Remesa, {
  foreignKey: "addressee",
  sourceKey: "id",
});

Remesa.belongsTo(Paf, {
  foreignKey: "addressee",
  as: "Addressee",
  targetKey: "id",
});

// Routes
Route.hasMany(Remesa, {
  foreignKey: "routeId",
  targetKey: "id",
});

Remesa.belongsTo(Route, {
  foreignKey: "routeId",
  targetKey: "id",
});
