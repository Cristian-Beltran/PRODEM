//import fueling model
import { Fueling } from "../models/Fueling.js";
import { Op, literal } from "sequelize";
import { User, Driver } from "../models/User.js";
import { Vehicle } from "../models/Vehicle.js";

//get fueling
export const getFuelings = async (req, res) => {
  try {
    const fuelings = await Fueling.findAll({
      attributes: [
        "id",
        "nInvoce",
        "partialFull",
        "price",
        "liters",
        "fuelType",
        "obvservations",
        "vehicleId",
        "driverId",
        "createdAt",
      ],
      order: ["createdAt", "DESC"],
    });
    res.json(fuelings);
  } catch (error) {
    res.status(500).json({
      errors: [error.message],
    });
  }
};

//get fueling by id
export const getFueling = async (req, res) => {
  try {
    const { id } = req.params;
    const fueling = await Fueling.findOne({
      where: { id },
      attributes: [
        "id",
        "nInvoce",
        "partialFull",
        "kmStart",
        "kmEnd",
        "price",
        "liters",
        "fuelType",
        "typeOfRoad",
        "obvservations",
        "vehicleId",
        "driverId",
        "createdAt",
      ],
    });
    res.json(fueling);
  } catch (error) {
    res.status(500).json({
      errors: [error.message],
    });
  }
};

//create fueling
export const createFueling = async (req, res) => {
  try {
    const {
      nInvoce,
      partialFull,
      kmStart,
      kmEnd,
      price,
      liters,
      fuelType,
      typeOfRoad,
      obvservations,
      driverId,
      vehicleId,
    } = req.body;
    await Fueling.create({
      nInvoce,
      partialFull,
      kmStart,
      kmEnd,
      price,
      liters,
      fuelType,
      typeOfRoad,
      obvservations,
      driverId,
      vehicleId,
    });
    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [error] });
  }
};

//update fueling
export const updateFueling = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nInvoce,
      partialFull,
      kmStart,
      kmEnd,
      price,
      liters,
      fuelType,
      typeOfRoad,
      obvservations,
      vehicleId,
      driverId,
    } = req.body;
    const fueling = await Fueling.findByPk(id);
    fueling.nInvoce = nInvoce;
    fueling.partialFull = partialFull;
    fueling.kmStart = kmStart;
    fueling.kmEnd = kmEnd;
    fueling.price = price;
    fueling.liters = liters;
    fueling.fuelType = fuelType;
    fueling.typeOfRoad = typeOfRoad;
    fueling.obvservations = obvservations;
    fueling.vehicleId = vehicleId;
    fueling.driverId = driverId;
    await fueling.save();
    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [error] });
  }
};

export const getFuelingsByVehicleId = async (req, res) => {
  try {
    const { id } = req.params;
    const { year, month } = req.query;

    let condition = {
      vehicleId: id,
    };
    if (month != "all") {
      condition = {
        vehicleId: id,
        [Op.and]: [
          literal(`EXTRACT(YEAR FROM "fuelings"."createdAt") = ${year}`),
          literal(`EXTRACT(MONTH FROM "fuelings"."createdAt") = ${month}`),
        ],
      };
    } else if (year) {
      condition = {
        vehicleId: id,
        [Op.and]: [
          literal(`EXTRACT(YEAR FROM "fuelings"."createdAt") = ${year}`),
        ],
      };
    }
    const fuelings = await Fueling.findAll({
      where: condition,
      include: [{ model: Driver, include: [{ model: User }] }],
    });
    const modifyFuelings = fuelings.map((fueling) => ({
      id: fueling.id,
      nInvoce: fueling.nInvoce,
      partialFull: fueling.partialFull,
      price: fueling.price,
      liters: fueling.liters,
      fuelType: fueling.fuelType,
      driver:
        fueling.driver.user.first_name + " " + fueling.driver.user.last_name,
      total: parseFloat(fueling.liters) * parseFloat(fueling.price),
      createdAt: fueling.createdAt,
    }));
    res.json(modifyFuelings);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const getFuelingsByDriver = async (req, res) => {
  try {
    const { year, month } = req.query;
    const driver = await Driver.findOne({ where: { userId: req.user.id } });
    let condition = {
      driverId: driver.id,
    };
    if (month != "all") {
      condition = {
        driverId: driver.id,
        [Op.and]: [
          literal(`EXTRACT(YEAR FROM "fuelings"."createdAt") = ${year}`),
          literal(`EXTRACT(MONTH FROM "fuelings"."createdAt") = ${month}`),
        ],
      };
    } else if (year) {
      condition = {
        driverId: driver.id,
        [Op.and]: [
          literal(`EXTRACT(YEAR FROM "fuelings"."createdAt") = ${year}`),
        ],
      };
    }
    const fuelings = await Fueling.findAll({
      where: condition,
      include: [{ model: Driver, include: [{ model: User }] }],
    });
    const modifyFuelings = fuelings.map((fueling) => ({
      id: fueling.id,
      nInvoce: fueling.nInvoce,
      partialFull: fueling.partialFull,
      price: fueling.price,
      liters: fueling.liters,
      fuelType: fueling.fuelType,
      driver:
        fueling.driver.user.first_name + " " + fueling.driver.user.last_name,
      total: parseFloat(fueling.liters) * parseFloat(fueling.price),
      createdAt: fueling.createdAt,
    }));
    res.json(modifyFuelings);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [error.message],
    });
  }
};

//create fueling
export const createFuelingDriver = async (req, res) => {
  try {
    const {
      nInvoce,
      partialFull,
      kmStart,
      kmEnd,
      price,
      liters,
      fuelType,
      typeOfRoad,
      obvservations,
    } = req.body;
    const driver = await Driver.findOne({ where: { userId: req.user.id } });
    const vehicle = await Vehicle.findOne({ where: { driverId: driver.id } });
    await Fueling.create({
      nInvoce,
      partialFull,
      kmStart,
      kmEnd,
      price,
      liters,
      fuelType,
      typeOfRoad,
      obvservations,
      driverId: driver.id,
      vehicleId: vehicle.id,
    });
    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [error] });
  }
};


