import { VerifyVehicle } from "../models/VerifyVehicle.js";
import { User, Driver } from "../models/User.js";
import { Vehicle } from "../models/Vehicle.js";

//get verifyVehicles
export const getVerifyVehicles = async (req, res) => {
  try {
    const verifyVehicles = await VerifyVehicle.findAll({
      include: [
        {
          model: Driver,
          include: [{ model: User }],
        },
        {
          model: User,
        },
        {
          model: Vehicle,
        },
      ],
    });
    const formattedVerifyVehicles = verifyVehicles.map((verifyVehicles) => ({
      id: verifyVehicles.id,
      km: verifyVehicles.km,
      observations: verifyVehicles.observations,
      driver: `${verifyVehicles.driver.user.first_name} ${verifyVehicles.driver.user.last_name}`,
      guard: `${verifyVehicles.user.first_name} ${verifyVehicles.user.last_name}`,
      vehicle: `${verifyVehicles.vehicle.model} ${verifyVehicles.vehicle.model}`,
      createdAt: verifyVehicles.createdAt,
    }));
    res.json(formattedVerifyVehicles);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const getVerifyVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const verifyVehicles = await VerifyVehicle.findOne({
      where: { id },
      include: [
        {
          model: Driver,
          include: [{ model: User }],
        },
        {
          model: User,
        },
        {
          model: Vehicle,
        },
      ],
    });

    // Formatear los resultados antes de enviarlos
    const data = {
      id: verifyVehicles.id,
      detail: verifyVehicles.detail,
      amount: verifyVehicles.amount,
      createdAt: verifyVehicles.createdAt,
      km: verifyVehicles.km,
      lightParking: verifyVehicles.lightParking,
      lightLow: verifyVehicles.lightLow,
      lightHigh: verifyVehicles.lightHigh,
      lightReverse: verifyVehicles.lightReverse,
      lightTravel: verifyVehicles.lightTravel,
      equipmentFlasher: verifyVehicles.equipmentFlasher,
      equipmentHooter: verifyVehicles.equipmentHooter,
      equipmentMailbox: verifyVehicles.equipmentMailbox,
      equipmentGlass: verifyVehicles.equipmentGlass,
      equipmentPI: verifyVehicles.equipmentPI,
      brakeHand: verifyVehicles.brakeHand,
      brakeFoot: verifyVehicles.brakeFoot,
      brakeOther: verifyVehicles.brakeOther,
      communicationGPS: verifyVehicles.communicationGPS,
      communicationGSM: verifyVehicles.communicationGSM,
      communicationContingency: verifyVehicles.communicationContingency,
      tireFR: verifyVehicles.tireFR,
      tireFL: verifyVehicles.tireFL,
      tireBR: verifyVehicles.tireBR,
      tireBL: verifyVehicles.tireBL,
      tireReplace: verifyVehicles.tireReplace,
      contingenciesMask: verifyVehicles.contingenciesMask,
      contingenciesOxigen: verifyVehicles.contingenciesOxigen,
      contingenciesTriangles: verifyVehicles.contingenciesTriangles,
      contingenciesKit: verifyVehicles.contingenciesKit,
      contingenciesExtinguisher1: verifyVehicles.contingenciesExtinguisher1,
      contingenciesExtinguisher2: verifyVehicles.contingenciesExtinguisher2,
      daHydraulicjack: verifyVehicles.daHydraulicjack,
      daWheelwrench: verifyVehicles.daWheelwrench,
      daSeatbelt: verifyVehicles.daSeatbelt,
      daMirrors: verifyVehicles.daMirrors,
      daBhorn: verifyVehicles.daBhorn,
      daLocks: verifyVehicles.daLocks,
      bulletproofdriver: verifyVehicles.bulletproofdriver,
      bulletproofP1: verifyVehicles.bulletproofP1,
      bulletproofP2: verifyVehicles.bulletproofP2,
      bulletproofG1: verifyVehicles.bulletproofG1,
      bulletproofG2: verifyVehicles.bulletproofG2,
      fuel: verifyVehicles.fuel,
      observations: verifyVehicles.observations,
      driverId: verifyVehicles.driverId,
      driverName: `${verifyVehicles.driver.user.first_name} ${verifyVehicles.driver.user.last_name}`,
      guardId: verifyVehicles.guardId,
      guardName: `${verifyVehicles.user.first_name} ${verifyVehicles.user.last_name}`,
      vehicleId: verifyVehicles.vehicleId,
      vehicleName: `${verifyVehicles.vehicle.model} ${verifyVehicles.vehicle.plate}`,
    };

    res.json(data);
  } catch (error) {
    res.status(500).json({
      errors: [error.message],
    });
  }
};

//create verifyVehicle
export const createVerifyVehicle = async (req, res) => {
  try {
    const {
      vehicleId,
      driverId,
      guardId,
      km,
      lightParking,
      lightLow,
      lightHigh,
      lightReverse,
      lightTravel,
      equipmentFlasher,
      equipmentHooter,
      equipmentMailbox,
      equipmentGlass,
      equipmentPI,
      brakeHand,
      brakeFoot,
      brakeOther,
      communicationGPS,
      communicationGSM,
      communicationContingency,
      tireFR,
      tireFL,
      tireBR,
      tireBL,
      tireReplace,
      contingenciesMask,
      contingenciesOxigen,
      contingenciesTriangles,
      contingenciesKit,
      contingenciesExtinguisher1,
      contingenciesExtinguisher2,
      daHydraulicjack,
      daWheelwrench,
      daSeatbelt,
      daMirrors,
      daBhorn,
      daLocks,
      bulletproofdriver,
      bulletproofP1,
      bulletproofP2,
      bulletproofG1,
      bulletproofG2,
      fuel,
      observations,
    } = req.body;

    await VerifyVehicle.create({
      vehicleId,
      driverId,
      guardId,
      km,
      lightParking,
      lightLow,
      lightHigh,
      lightReverse,
      lightTravel,
      equipmentFlasher,
      equipmentHooter,
      equipmentMailbox,
      equipmentGlass,
      equipmentPI,
      brakeHand,
      brakeFoot,
      brakeOther,
      communicationGPS,
      communicationGSM,
      communicationContingency,
      tireFR,
      tireFL,
      tireBR,
      tireBL,
      tireReplace,
      contingenciesMask,
      contingenciesOxigen,
      contingenciesTriangles,
      contingenciesKit,
      contingenciesExtinguisher1,
      contingenciesExtinguisher2,
      daHydraulicjack,
      daWheelwrench,
      daSeatbelt,
      daMirrors,
      daBhorn,
      daLocks,
      bulletproofdriver,
      bulletproofP1,
      bulletproofP2,
      bulletproofG1,
      bulletproofG2,
      fuel,
      observations,
    });

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [error.message],
    });
  }
};

//update verifyVehicle
export const updateVerifyVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      vehicleId,
      driverId,
      guardId,
      km,
      lightParking,
      lightLow,
      lightHigh,
      lightReverse,
      lightTravel,
      equipmentFlasher,
      equipmentHooter,
      equipmentMailbox,
      equipmentGlass,
      equipmentPI,
      brakeHand,
      brakeFoot,
      brakeOther,
      communicationGPS,
      communicationGSM,
      communicationContingency,
      tireFR,
      tireFL,
      tireBR,
      tireBL,
      tireReplace,
      contingenciesMask,
      contingenciesOxigen,
      contingenciesTriangles,
      contingenciesKit,
      contingenciesExtinguisher1,
      contingenciesExtinguisher2,
      daHydraulicjack,
      daWheelwrench,
      daSeatbelt,
      daMirrors,
      daBhorn,
      daLocks,
      bulletproofdriver,
      bulletproofP1,
      bulletproofP2,
      bulletproofG1,
      bulletproofG2,
      fuel,
      observations,
    } = req.body;
    const verifyVehicle = await VerifyVehicle.findByPk(id);
    verifyVehicle.vehicleId = vehicleId;
    verifyVehicle.driverId = driverId;
    verifyVehicle.guardId = guardId;
    verifyVehicle.km = km;
    verifyVehicle.lightParking = lightParking;
    verifyVehicle.lightLow = lightLow;
    verifyVehicle.lightHigh = lightHigh;
    verifyVehicle.lightReverse = lightReverse;
    verifyVehicle.lightTravel = lightTravel;
    verifyVehicle.equipmentFlasher = equipmentFlasher;
    verifyVehicle.equipmentHooter = equipmentHooter;
    verifyVehicle.equipmentMailbox = equipmentMailbox;
    verifyVehicle.equipmentGlass = equipmentGlass;
    verifyVehicle.equipmentPI = equipmentPI;
    verifyVehicle.brakeHand = brakeHand;
    verifyVehicle.brakeFoot = brakeFoot;
    verifyVehicle.brakeOther = brakeOther;
    verifyVehicle.communicationGPS = communicationGPS;
    verifyVehicle.communicationGSM = communicationGSM;
    verifyVehicle.communicationContingency = communicationContingency;
    verifyVehicle.tireFR = tireFR;
    verifyVehicle.tireFL = tireFL;
    verifyVehicle.tireBR = tireBR;
    verifyVehicle.tireBL = tireBL;
    verifyVehicle.tireReplace = tireReplace;
    verifyVehicle.contingenciesMask = contingenciesMask;
    verifyVehicle.contingenciesOxigen = contingenciesOxigen;
    verifyVehicle.contingenciesTriangles = contingenciesTriangles;
    verifyVehicle.contingenciesKit = contingenciesKit;
    verifyVehicle.contingenciesExtinguisher1 = contingenciesExtinguisher1;
    verifyVehicle.contingenciesExtinguisher2 = contingenciesExtinguisher2;
    verifyVehicle.daHydraulicjack = daHydraulicjack;
    verifyVehicle.daWheelwrench = daWheelwrench;
    verifyVehicle.daSeatbelt = daSeatbelt;
    verifyVehicle.daMirrors = daMirrors;
    verifyVehicle.daBhorn = daBhorn;
    verifyVehicle.daLocks = daLocks;
    verifyVehicle.bulletproofdriver = bulletproofdriver;
    verifyVehicle.bulletproofP1 = bulletproofP1;
    verifyVehicle.bulletproofP2 = bulletproofP2;
    verifyVehicle.bulletproofG1 = bulletproofG1;
    verifyVehicle.bulletproofG2 = bulletproofG2;
    verifyVehicle.fuel = fuel;
    verifyVehicle.observations = observations;
    verifyVehicle.save();
    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [error] });
  }
};

export const getVerifyVehicleDriver = async (req, res) => {
  try {
    const driver = await Driver.findOne({ where: { userId: req.user.id } });
    const verifyVehicles = await VerifyVehicle.findAll({
      where: { driverId: driver.id },
      include: [
        {
          model: Driver,
          include: [{ model: User }],
        },
        {
          model: User,
        },
        {
          model: Vehicle,
        },
      ],
    });
    const formattedVerifyVehicles = verifyVehicles.map((verifyVehicles) => ({
      id: verifyVehicles.id,
      km: verifyVehicles.km,
      observations: verifyVehicles.observations,
      driver: `${verifyVehicles.driver.user.first_name} ${verifyVehicles.driver.user.last_name}`,
      guard: `${verifyVehicles.user.first_name} ${verifyVehicles.user.last_name}`,
      vehicle: `${verifyVehicles.vehicle.model} ${verifyVehicles.vehicle.model}`,
      createdAt: verifyVehicles.createdAt,
    }));
    res.json(formattedVerifyVehicles);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [error.message],
    });
  }
};

//create verifyVehicle
export const createVerifyVehicleDriver = async (req, res) => {
  try {
    const {
      guardId,
      km,
      lightParking,
      lightLow,
      lightHigh,
      lightReverse,
      lightTravel,
      equipmentFlasher,
      equipmentHooter,
      equipmentMailbox,
      equipmentGlass,
      equipmentPI,
      brakeHand,
      brakeFoot,
      brakeOther,
      communicationGPS,
      communicationGSM,
      communicationContingency,
      tireFR,
      tireFL,
      tireBR,
      tireBL,
      tireReplace,
      contingenciesMask,
      contingenciesOxigen,
      contingenciesTriangles,
      contingenciesKit,
      contingenciesExtinguisher1,
      contingenciesExtinguisher2,
      daHydraulicjack,
      daWheelwrench,
      daSeatbelt,
      daMirrors,
      daBhorn,
      daLocks,
      bulletproofdriver,
      bulletproofP1,
      bulletproofP2,
      bulletproofG1,
      bulletproofG2,
      fuel,
      observations,
    } = req.body;

    const driver = await Driver.findOne({ where: { userId: req.user.id } });
    const vehicle = await Vehicle.findOne({ where: { driverId: driver.id } });
    await VerifyVehicle.create({
      driverId: driver.id,
      vehicleId: vehicle.id,
      guardId,
      km,
      lightParking,
      lightLow,
      lightHigh,
      lightReverse,
      lightTravel,
      equipmentFlasher,
      equipmentHooter,
      equipmentMailbox,
      equipmentGlass,
      equipmentPI,
      brakeHand,
      brakeFoot,
      brakeOther,
      communicationGPS,
      communicationGSM,
      communicationContingency,
      tireFR,
      tireFL,
      tireBR,
      tireBL,
      tireReplace,
      contingenciesMask,
      contingenciesOxigen,
      contingenciesTriangles,
      contingenciesKit,
      contingenciesExtinguisher1,
      contingenciesExtinguisher2,
      daHydraulicjack,
      daWheelwrench,
      daSeatbelt,
      daMirrors,
      daBhorn,
      daLocks,
      bulletproofdriver,
      bulletproofP1,
      bulletproofP2,
      bulletproofG1,
      bulletproofG2,
      fuel,
      observations,
    });

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [error.message],
    });
  }
};
