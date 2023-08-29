import { Driver, User } from "../models/User.js";
import bcrypt from "bcryptjs";
import { Vehicle } from "../models/Vehicle.js";
import { Op } from "sequelize";

export const getDrivers = async (req, res) => {
  try {
    const drivers = await Driver.findAll({
      include: [{ model: User }],
    });
    const driversJson = drivers.map((driver) => ({
      id: driver.user.id,
      email: driver.user.email,
      first_name: driver.user.first_name,
      last_name: driver.user.last_name,
      username: driver.user.username,
      license: driver.license,
      status: driver.user.status,
      createdAt: driver.user.createdAt,
    }));
    res.json(driversJson);
  } catch (error) {
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const createDriver = async (req, res) => {
  const {
    first_name,
    last_name,
    ci,
    address,
    telf,
    email,
    username,
    birthdate,
    license,
  } = req.body;
  try {
    const password = `${username}${ci}`;

    const userEmail = await User.findOne({ where: { email } });
    if (userEmail)
      return res.status(400).json({ errors: ["El correo ya existe"] });

    const userCi = await User.findOne({ where: { ci } });
    if (userCi)
      return res.status(400).json({ errors: ["El ci ya esta ingresado"] });

    const userUsername = await User.findOne({ where: { username } });
    if (userUsername)
      return res
        .status(400)
        .json({ errors: ["El username ya esta ingresado"] });

    const passwordHash = await bcrypt.hash(password, 10); // hashaleatorio

    const newUser = await User.create({
      first_name,
      last_name,
      ci,
      address,
      telf,
      type: "conductor",
      password: passwordHash,
      username,
      birthdate,
      status: true,
      email,
    });
    await Driver.create({
      license,
      userId: newUser.id,
    });
    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [error] });
  }
};

export const getDriver = async (req, res) => {
  const { id } = req.params;
  try {
    const driver = await Driver.findOne({
      where: { userId: id },
      include: [{ model: User }],
    });
    const driverJson = {
      id: driver.id,
      email: driver.user.email,
      first_name: driver.user.first_name,
      last_name: driver.user.last_name,
      ci: driver.user.ci,
      address: driver.user.address,
      license: driver.license,
      birthdate: driver.user.birthdate,
      username: driver.user.username,
      telf: driver.user.telf,
    };
    res.json(driverJson);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const updateDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      ci,
      address,
      telf,
      email,
      username,
      birthdate,
      license,
    } = req.body;

    const driver = await Driver.findOne({ where: { userId: id } });
    const user = await User.findByPk(driver.userId);

    const userEmail = await User.findOne({
      where: { email },
    });
    const userCi = await User.findOne({
      where: { ci },
    });
    const userUsername = await User.findOne({
      where: { username },
    });

    if (userEmail && userEmail.email === user.email && userEmail.id != user.id)
      return res.status(400).json({ errors: ["El email ya esta ingresado"] });
    if (userCi && userCi.ci === user.ci && userCi.id != user.id)
      return res.status(400).json({ errors: ["El ci ya esta ingresado"] });
    if (
      userUsername &&
      userUsername.username === user.email &&
      userUsername.id != user.id
    )
      return res
        .status(400)
        .json({ errors: ["El nombre de usario ya esta ingresado"] });

    user.first_name = first_name;
    user.last_name = last_name;
    if (user.ci != ci) user.ci = ci;
    if (user.email != email) user.email = email;
    if (user.username != username) user.username = username;
    user.address = address;
    user.telf = telf;
    user.birthdate = birthdate;
    driver.license = license;
    await user.save();
    await driver.save();
    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [error] });
  }
};

export const getDriversVehicle = async (req, res) => {
  try {
    const drivers = await Driver.findAll({
      where: {
        "$vehicle.driverId$": { [Op.eq]: null },
      },
      include: [{ model: Vehicle }, { model: User }],
    });
    const driversModify = drivers.map((driver) => ({
      id: driver.id,
      first_name: driver.user.first_name,
      last_name: driver.user.last_name,
    }));
    res.json(driversModify);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const getDriverVehicle = async (req, res) => {
  const { id } = req.params;
  try {
    const drivers = await Driver.findAll({
      where: {
        "$vehicle.driverId$": { [Op.or]: { [Op.eq]: null, [Op.eq]: id } },
      },
      include: [{ model: Vehicle }, { model: User }],
    });
    const driversModify = drivers.map((driver) => ({
      id: driver.id,
      first_name: driver.user.first_name,
      last_name: driver.user.last_name,
    }));
    res.json(driversModify);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [error.message],
    });
  }
};
