import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { Vehicle } from "./Vehicle.js";
import { User, Driver } from "./User.js";

export const VerifyVehicle = sequelize.define("verifyVehicles", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  km: {
    type: DataTypes.INTEGER,
    require: true,
  },
  lightParking: {
    type: DataTypes.varchar,
    require: true,
  },
  lightLow: {
    type: DataTypes.varchar,
    require: true,
  },
  lightHigh: {
    type: DataTypes.varchar,
    require: true,
  },
  lightReverse: {
    type: DataTypes.varchar,
    require: true,
  },
  lightTravel: {
    type: DataTypes.varchar,
    require: true,
  },
  equipmentFlasher: {
    type: DataTypes.varchar,
    require: true,
  },
  equipmentHooter: {
    type: DataTypes.varchar,
    require: true,
  },
  equipmentMailbox: {
    type: DataTypes.varchar,
    require: true,
  },
  equipmentGlass: {
    type: DataTypes.varchar,
    require: true,
  },
  equipmentPI: {
    type: DataTypes.varchar,
    require: true,
  },
  brakeHand: {
    type: DataTypes.varchar,
    require: true,
  },
  brakeFoot: {
    type: DataTypes.varchar,
    require: true,
  },
  brakeOther: {
    type: DataTypes.varchar,
    require: true,
  },
  communicationGPS: {
    type: DataTypes.varchar,
    require: true,
  },
  communicationGSM: {
    type: DataTypes.varchar,
    require: true,
  },
  communicationContingency: {
    type: DataTypes.varchar,
    require: true,
  },
  tireFR: {
    type: DataTypes.varchar,
    require: true,
  },
  tireFL: {
    type: DataTypes.varchar,
    require: true,
  },
  tireBR: {
    type: DataTypes.varchar,
    require: true,
  },
  tireBL: {
    type: DataTypes.varchar,
    require: true,
  },
  tireReplace: {
    type: DataTypes.varchar,
    require: true,
  },
  contingenciesMask: {
    type: DataTypes.varchar,
    require: true,
  },
  contingenciesOxigen: {
    type: DataTypes.varchar,
    require: true,
  },
  contingenciesTriangles: {
    type: DataTypes.varchar,
    require: true,
  },
  contingenciesKit: {
    type: DataTypes.varchar,
    require: true,
  },
  contingenciesExtinguisher1: {
    type: DataTypes.varchar,
    require: true,
  }, // Vigente, no vigente
  contingenciesExtinguisher2: {
    type: DataTypes.varchar,
    require: true,
  }, // Vigente, no vigente
  daHydraulicjack: {
    type: DataTypes.varchar,
    require: true,
  },
  daWheelwrench: {
    type: DataTypes.varchar,
    require: true,
  },
  daSeatbelt: {
    type: DataTypes.varchar,
    require: true,
  },
  daMirrors: {
    type: DataTypes.varchar,
    require: true,
  },
  daBhorn: {
    type: DataTypes.varchar,
    require: true,
  },
  daLocks: {
    type: DataTypes.varchar,
    require: true,
  },
  bulletproofdriver: {
    type: DataTypes.varchar,
    require: true,
  },
  bulletproofP1: {
    type: DataTypes.varchar,
    require: true,
  },
  bulletproofP2: {
    type: DataTypes.varchar,
    require: true,
  },
  bulletproofG1: {
    type: DataTypes.varchar,
    require: true,
  },
  bulletproofG2: {
    type: DataTypes.varchar,
    require: true,
  },
  fuel: {
    type: DataTypes.varchar,
    require: true,
  }, // lleno, 3/4, 1/2 ,1/4
  observations: {
    type: DataTypes.TEXT,
  },
});

Vehicle.hasMany(VerifyVehicle, {
  foreignKey: "vehicleId",
  sourceKey: "id",
});

VerifyVehicle.belongsTo(Vehicle, {
  foreignKey: "vehicleId",
  targetKey: "id",
  allowNull: false,
});

Driver.hasMany(VerifyVehicle, {
  foreignKey: "driverId",
  sourceKey: "id",
});

VerifyVehicle.belongsTo(Driver, {
  foreignKey: "driverId",
  targetKey: "id",
  allowNull: false,
});

User.hasMany(VerifyVehicle, {
  foreignKey: "guardId",
  sourceKey: "id",
});

VerifyVehicle.belongsTo(User, {
  foreignKey: "guardId",
  targetKey: "id",
});
