import { Route } from "../models/Route.js";
import { Driver, User } from "../models/User.js";
import { Vehicle } from "../models/Vehicle.js";
import { Remesa } from "../models/Remesa.js";
import { Paf } from "../models/Paf.js";
import { Op } from "sequelize";

export const getRoutes = async (req, res) => {
  try {
    const routes = await Route.findAll({
      where: { complete: false },
      include: [
        { model: Driver, include: [{ model: User }] },
        { model: Vehicle },
        { model: User, as: "Guard1" },
        { model: User, as: "Guard2" },
        { model: User, as: "CarriesValue1" },
        { model: User, as: "CarriesValue2" },
      ],
    });
    const data = routes.map((route) => ({
      id: route.id,
      guard1: route.Guard1?.first_name + " " + route.Guard1?.last_name,
      guard2: route.Guard2?.first_name + " " + route.Guard1?.last_name,
      carrier1:
        route.CarriesValue1?.first_name + " " + route.CarriesValue1?.last_name,
      carrier2:
        route.CarriesValue2?.first_name + " " + route.CarriesValue2?.last_name,
      driver:
        route.driver?.user?.first_name + " " + route.driver?.user?.last_name,
      vehicle: route.vehicle?.model + " " + route.vehicle?.plate,
      createdAt: route.createdAt,
    }));
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const getRoutesDriver = async (req, res) => {
  try {
    const driver = await Driver.findOne({ where: { userId: req.user.id } });
    const routes = await Route.findAll({
      where: {
        driverId: driver.id,
        complete: false,
      },
      include: [
        { model: Driver, include: [{ model: User }] },
        { model: Vehicle },
        { model: User, as: "Guard1" },
        { model: User, as: "Guard2" },
        { model: User, as: "CarriesValue1" },
        { model: User, as: "CarriesValue2" },
      ],
    });
    const data = routes.map((route) => ({
      id: route.id,
      guard1: route.Guard1?.first_name + " " + route.Guard1?.last_name,
      guard2: route.Guard2?.first_name + " " + route.Guard1?.last_name,
      carrier1: route.CarriesValue1?.first_name + " " + route.Guard1?.last_name,
      carrier2: route.CarriesValue2?.first_name + " " + route.Guard1?.last_name,
      driver:
        route.driver?.user?.first_name + " " + route.driver?.user?.last_name,
      vehicle: route.vehicle?.model + " " + route.vehicle?.plate,
      createdAt: route.createdAt,
    }));
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const getRoutesCarrier = async (req, res) => {
  try {
    const routes = await Route.findAll({
      where: {
        complete: false,
        [Op.or]: [
          { carriesValue1: req.user.id },
          { carriesValue2: req.user.id },
        ],
      },
      include: [
        { model: Driver, include: [{ model: User }] },
        { model: Vehicle },
        { model: User, as: "Guard1" },
        { model: User, as: "Guard2" },
        { model: User, as: "CarriesValue1" },
        { model: User, as: "CarriesValue2" },
      ],
    });
    const data = routes.map((route) => ({
      id: route.id,
      guard1: route.Guard1?.first_name + " " + route.Guard1?.last_name,
      guard2: route.Guard2?.first_name + " " + route.Guard1?.last_name,
      carrier1: route.CarriesValue1?.first_name + " " + route.Guard1?.last_name,
      carrier2: route.CarriesValue2?.first_name + " " + route.Guard1?.last_name,
      driver:
        route.driver?.user?.first_name + " " + route.driver?.user?.last_name,
      vehicle: route.vehicle?.model + " " + route.vehicle?.plate,
      createdAt: route.createdAt,
    }));
    res.json(data);
  } catch (data) {
    console.log(error);
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const getRoutesComplete = async (req, res) => {
  try {
    const routes = await Route.findAll({
      where: {
        complete: true,
      },
      include: [
        { model: Driver, include: [{ model: User }] },
        { model: Vehicle },
        { model: User, as: "Guard1" },
        { model: User, as: "Guard2" },
        { model: User, as: "CarriesValue1" },
        { model: User, as: "CarriesValue2" },
      ],
    });
    const data = routes.map((route) => ({
      id: route.id,
      guard1: route.Guard1?.first_name + " " + route.Guard1?.last_name,
      guard2: route.Guard2?.first_name + " " + route.Guard1?.last_name,
      carrier1: route.CarriesValue1?.first_name + " " + route.Guard1?.last_name,
      carrier2: route.CarriesValue2?.first_name + " " + route.Guard1?.last_name,
      driver:
        route.driver?.user?.first_name + " " + route.driver?.user?.last_name,
      vehicle: route.vehicle?.model + " " + route.vehicle?.plate,
      createdAt: route.createdAt,
    }));

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const getRoute = async (req, res) => {
  const { id } = req.params;
  try {
    const route = await Route.findOne({
      where: { id },
      include: [
        { model: Driver, include: [{ model: User }] },
        { model: Vehicle },
        { model: User, as: "Guard1" },
        { model: User, as: "Guard2" },
        { model: User, as: "CarriesValue1" },
        { model: User, as: "CarriesValue2" },
        {
          model: Remesa,
          include: [
            { model: Paf, as: "Addressee" },
            { model: Paf, as: "Sender" },
          ],
        },
      ],
    });
    res.json(route);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const deleteRoute = async (req, res) => {
  const { id } = req.params;
  try {
    const route = await Route.findByPk(id);
    if (route.complete)
      return res
        .status(500)
        .json({ errors: ["No se puede eliminar una ruta completada"] });
    await Route.destroy({ where: { id } });
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const createRoute = async (req, res) => {
  try {
    const { guard1, guard2, vehicleId, remesas, carriesValue1, carriesValue2 } =
      req.body;
    const complete = false;
    const vehicle = await Vehicle.findOne({ where: { id: vehicleId } });
    const driverId = vehicle.driverId;
    const route = await Route.create({
      driverId,
      guard1,
      guard2,
      vehicleId,
      carriesValue1,
      carriesValue2,
      complete,
    });
    const remesasCheckTrue = remesas.filter((item) => item.check);
    const arrayId = remesasCheckTrue.map((remesa) => remesa.id);
    await Remesa.update(
      {
        routeId: route.id,
        carriesValue1: carriesValue1,
        carriesValue2: carriesValue2,
      },
      {
        where: {
          id: arrayId,
        },
      }
    );
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const updateRoute = async (req, res) => {
  try {
    const { id } = req.params;
    const { guard1, guard2, vehicleId, remesas, carriesValue1, carriesValue2 } =
      req.body;
    const vehicle = await Vehicle.findOne({ where: { id: vehicleId } });
    const driverId = vehicle.driverId;
    const route = await Route.findByPk(id);
    if (route.complete)
      return res
        .status(500)
        .json({ errors: ["No se puede modificar una ruta completada"] });
    route.driverId = driverId;
    route.guard1 = guard1;
    route.guard2 = guard2;
    route.carriesValue1 = carriesValue1;
    route.carriesValue2 = carriesValue2;
    route.vehicleId = vehicleId;
    route.save();
    const remesasCheckTrue = remesas.filter((item) => item.check);
    const remesasCheckFalse = remesas.filter((item) => !item.check);
    const arrayId = remesasCheckTrue.map((remesa) => remesa.id);
    const arrayIdNull = remesasCheckFalse.map((remesa) => remesa.id);
    await Remesa.update(
      {
        routeId: route.id,
        carriesValue1: carriesValue1,
        carriesValue2: carriesValue2,
      },
      { where: { id: arrayId } }
    );
    await Remesa.update(
      { routeId: null, carriesValue1: null, carriesValue2: null },
      { where: { id: arrayIdNull } }
    );
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [error.message],
    });
  }
};
