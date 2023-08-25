import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const User = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    require: true,
  },
  email: {
    type: DataTypes.STRING,
    require: true,
  },
  password: {
    type: DataTypes.STRING,
    require: true,
  },
  type: {
    type: DataTypes.STRING,
    require: true,
  },
  first_name: {
    type: DataTypes.STRING,
    require: true,
  },
  last_name: {
    type: DataTypes.STRING,
    require: true,
  },
  ci: {
    type: DataTypes.STRING,
    unique: true,
  },
  address: {
    type: DataTypes.TEXT,
  },
  telf: {
    type: DataTypes.STRING,
  },
  birthdate: {
    type: DataTypes.DATE,
    require: true
  },
  status: {
    type: DataTypes.BOOLEAN,
    default: true,
  }
});

export const Driver = sequelize.define(
  "drivers",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    license: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

User.hasOne(Driver, {
  foreignKey: "userId",
  sourceKey: "id",
});

Driver.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "id",
  allowNull: false,
  unique: true,
});
