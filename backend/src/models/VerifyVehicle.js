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
    type: DataTypes.STRING,
    require: true,
  },
  lightLow: {
    type: DataTypes.STRING,
    require: true,
  },
  lightHigh: {
    type: DataTypes.STRING,
    require: true,
  },
  lightReverse: {
    type: DataTypes.STRING,
    require: true,
  },
  lightTravel: {
    type: DataTypes.STRING,
    require: true,
  },
  equipmentFlasher: {
    type: DataTypes.STRING,
    require: true,
  },
  equipmentHooter: {
    type: DataTypes.STRING,
    require: true,
  },
  equipmentMailbox: {
    type: DataTypes.STRING,
    require: true,
  },
  equipmentGlass: {
    type: DataTypes.STRING,
    require: true,
  },
  equipmentPI: {
    type: DataTypes.STRING,
    require: true,
  },
  brakeHand: {
    type: DataTypes.STRING,
    require: true,
  },
  brakeFoot: {
    type: DataTypes.STRING,
    require: true,
  },
  brakeOther: {
    type: DataTypes.STRING,
    require: true,
  },
  communicationGPS: {
    type: DataTypes.STRING,
    require: true,
  },
  communicationGSM: {
    type: DataTypes.STRING,
    require: true,
  },
  communicationContingency: {
    type: DataTypes.STRING,
    require: true,
  },
  tireFR: {
    type: DataTypes.STRING,
    require: true,
  },
  tireFL: {
    type: DataTypes.STRING,
    require: true,
  },
  tireBR: {
    type: DataTypes.STRING,
    require: true,
  },
  tireBL: {
    type: DataTypes.STRING,
    require: true,
  },
  tireReplace: {
    type: DataTypes.STRING,
    require: true,
  },
  contingenciesMask: {
    type: DataTypes.STRING,
    require: true,
  },
  contingenciesOxigen: {
    type: DataTypes.STRING,
    require: true,
  },
  contingenciesTriangles: {
    type: DataTypes.STRING,
    require: true,
  },
  contingenciesKit: {
    type: DataTypes.STRING,
    require: true,
  },
  contingenciesExtinguisher1: {
    type: DataTypes.STRING,
    require: true,
  }, // Vigente, no vigente
  contingenciesExtinguisher2: {
    type: DataTypes.STRING,
    require: true,
  }, // Vigente, no vigente
  daHydraulicjack: {
    type: DataTypes.STRING,
    require: true,
  },
  daWheelwrench: {
    type: DataTypes.STRING,
    require: true,
  },
  daSeatbelt: {
    type: DataTypes.STRING,
    require: true,
  },
  daMirrors: {
    type: DataTypes.STRING,
    require: true,
  },
  daBhorn: {
    type: DataTypes.STRING,
    require: true,
  },
  daLocks: {
    type: DataTypes.STRING,
    require: true,
  },
  bulletproofdriver: {
    type: DataTypes.STRING,
    require: true,
  },
  bulletproofP1: {
    type: DataTypes.STRING,
    require: true,
  },
  bulletproofP2: {
    type: DataTypes.STRING,
    require: true,
  },
  bulletproofG1: {
    type: DataTypes.STRING,
    require: true,
  },
  bulletproofG2: {
    type: DataTypes.STRING,
    require: true,
  },
  fuel: {
    type: DataTypes.STRING,
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
