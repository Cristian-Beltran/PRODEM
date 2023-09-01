import { User, Driver } from "../models/User.js";
import { Vehicle } from "../models/Vehicle.js";

export const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll({
      include: [
        {
          model: Driver,
          include: [
            {
              model: User,
            },
          ],
        },
      ],
    });
    const vehiclesModify = vehicles.map((vehicle) => ({
      id: vehicle.id,
      model: vehicle.model,
      plate: vehicle.plate,
      driver: vehicle.driver.user.username,
      createdAt: vehicle.createdAt,
    }));
    res.json(vehiclesModify);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const getVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findOne({
      where: { id },
      include: [{ model: Driver, include: [{ model: User }] }],
    });
    const data = {
      id: vehicle.id,
      model: vehicle.model,
      plate: vehicle.plate,
      driver: vehicle.driver.id,
      photo: `/static/${vehicle.photo}`,
      driverFullName:
        vehicle.driver.user.first_name + " " + vehicle.driver.user.last_name,
      createdAt: vehicle.createdAt,
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const createVehicle = async (req, res) => {
  const { model, plate, driver } = req.body;
  try {
    await Vehicle.create({
      model,
      plate,
      driverId: driver,
    });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const { model, plate, driver } = req.body;
    const vehicle = await Vehicle.findByPk(id);
    vehicle.model = model;
    vehicle.plate = plate;
    vehicle.driverId = driver;
    await vehicle.save();
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const uploadPhoto = async (req, res) => {
  try {
    if (!req.file)
      return res.status(500).json({ errors: ["No se cargo un archivo"] });
    const { id } = req.params;
    const vehicle = await Vehicle.findByPk(id);
    vehicle.photo = req.file.filename;
    vehicle.save();
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};
