import { TypeMaintenances, Maintenance } from "../models/Maintenance.js";
import { User, Driver } from "../models/User.js";
import { Vehicle } from "../models/Vehicle.js";
import { Op, literal } from "sequelize";

//get maintenances
export const getMaintenances = async (req, res) => {
  try {
    const maintenances = await Maintenance.findAll({
      include: [{ model: TypeMaintenances }, { model: Vehicle }],
      order: ["createdAt", "DESC"],
    });

    const formattedMaintenances = maintenances.map((maintenance) => ({
      id: maintenance.id,
      nInvoce: maintenance.nInvoce,
      detail: maintenance.detail,
      amount: maintenance.amount,
      createdAt: maintenance.createdAt,
      vehicleModel: maintenance.vehicle.model,
      vehiclePlate: maintenance.vehicle.plate,
      typeMaintenanceName: maintenance.typeMaintenance
        ? maintenance.TypeMaintenance.name
        : null,
    }));
    res.json(formattedMaintenances);
  } catch (error) {
    res.status(500).json({
      errors: [error.message],
    });
  }
};

//get maintenance by id
export const getMaintenance = async (req, res) => {
  try {
    const { id } = req.params;
    const maintenance = await Maintenance.findOne({
      where: { id },
      include: [{ model: TypeMaintenances }, { model: Vehicle }],
    });

    const data = {
      id: maintenance.id,
      nInvoce: maintenance.nInvoce,
      detail: maintenance.detail,
      amount: maintenance.amount,
      typeMaintenanceId: maintenance.typeMaintenanceId,
      vehicleId: maintenance.vehicleId,
      createdAt: maintenance.createdAt,
      vehicleModel: maintenance.vehicle.model,
      vehiclePlate: maintenance.vehicle.plate,
      typeMaintenanceName: maintenance.TypeMaintenance
        ? maintenance.TypeMaintenance.name
        : null,
      typeMaintenanceDetail: maintenance.TypeMaintenance
        ? maintenance.TypeMaintenance.detail
        : null,
    };
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [error.message],
    });
  }
};

//create maintenance
export const createMaintenance = async (req, res) => {
  try {
    const { nInvoce, detail, amount, typeMaintenanceId, vehicleId } = req.body;
    await Maintenance.create({
      nInvoce,
      detail,
      amount,
      typeMaintenanceId,
      vehicleId,
    });
    return res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      errors: [error.message],
    });
  }
};

//update maintenance
export const updateMaintenance = async (req, res) => {
  try {
    const { id } = req.params;
    const { nInvoce, detail, amount, typeMaintenanceId, vehicleId } = req.body;
    const maintenance = await Maintenance.findByPk(id);
    maintenance.nInvoce = nInvoce;
    maintenance.detail = detail;
    maintenance.amount = amount;
    maintenance.typeMaintenanceId = typeMaintenanceId;
    maintenance.vehicleId = vehicleId;
    await maintenance.save();
    return res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const getMaintenancesByVehicleId = async (req, res) => {
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
          literal(`EXTRACT(YEAR FROM "maintenances"."createdAt") = ${year}`),
          literal(`EXTRACT(MONTH FROM "maintenances"."createdAt") = ${month}`),
        ],
      };
    } else if (year) {
      condition = {
        vehicleId: id,
        [Op.and]: [
          literal(`EXTRACT(YEAR FROM "maintenances"."createdAt") = ${year}`),
        ],
      };
    }
    const maintenances = await Maintenance.findAll({
      where: condition,
      include: [{ model: TypeMaintenances }],
    });

    const modifyMaintenances = maintenances.map((maintenance) => ({
      id: maintenance.id,
      nInvoce: maintenance.nInvoce,
      detail: maintenance.detail,
      amount: maintenance.amount,
      createdAt: maintenance.createdAt,
      typeMaintenanceName: maintenance.typeMaintenance
        ? maintenance.typeMaintenance.name
        : null,
    }));
    res.json(modifyMaintenances);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const getMaintenancesByDriver = async (req, res) => {
  try {
    const { year, month } = req.query;
    const driver = await Driver.findOne({ where: { userId: req.user.id } });
    const vehicle = await Vehicle.findOne({ where: { driverId: driver.id } });
    let condition = {
      vehicleId: vehicle.id,
    };
    if (month != "all") {
      condition = {
        vehicleId: vehicle.id,
        [Op.and]: [
          literal(`EXTRACT(YEAR FROM "maintenances"."createdAt") = ${year}`),
          literal(`EXTRACT(MONTH FROM "maintenances"."createdAt") = ${month}`),
        ],
      };
    } else if (year) {
      condition = {
        vehicleId: vehicle.id,
        [Op.and]: [
          literal(`EXTRACT(YEAR FROM "maintenances"."createdAt") = ${year}`),
        ],
      };
    }
    const maintenances = await Maintenance.findAll({
      where: condition,
      include: [{ model: TypeMaintenances }],
    });

    const modifyMaintenances = maintenances.map((maintenance) => ({
      id: maintenance.id,
      nInvoce: maintenance.nInvoce,
      detail: maintenance.detail,
      amount: maintenance.amount,
      createdAt: maintenance.createdAt,
      typeMaintenanceName: maintenance.typeMaintenance
        ? maintenance.typeMaintenance.name
        : null,
    }));
    res.json(modifyMaintenances);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [error.message],
    });
  }
};

//create maintenance
export const createMaintenanceDriver = async (req, res) => {
  try {
    const { nInvoce, detail, amount, typeMaintenanceId } = req.body;
    const driver = await Driver.findOne({ where: { userId: req.user.id } });
    const vehicle = await Vehicle.findOne({ where: { driverId: driver.id } });
    await Maintenance.create({
      nInvoce,
      detail,
      amount,
      typeMaintenanceId,
      vehicleId: vehicle.id,
    });
    return res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      errors: [error.message],
    });
  }
};
