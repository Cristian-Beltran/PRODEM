import { User } from "../models/User.js";
import { Paf } from "../models/Paf.js";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";

export const getUsers = async (req, res) => {
  const { type } = req.params;
  try {
    const users = await User.findAll({
      where: { type, id: { [Op.ne]: req.user.id } },
      attributes: [
        "id",
        "email",
        "first_name",
        "last_name",
        "username",
        "status",
        "createdAt",
      ],
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const getManagers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { type: "gerente" },
      attributes: [
        "id",
        "email",
        "first_name",
        "last_name",
        "username",
        "status",
        "createdAt",
      ],
      include: [{ model: Paf }],
    });
    const usersModify = users.map((user) => ({
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      status: user.status,
      createdAt: user.createdAt,
      paf: user.paf ? user.paf.name : "",
    }));
    res.json(usersModify);
  } catch (error) {
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const getManagersPaf = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { type: "gerente", "$paf.userId$": { [Op.eq]: null } },
      attributes: [
        "id",
        "email",
        "first_name",
        "last_name",
        "username",
        "status",
        "createdAt",
      ],
      include: [{ model: Paf }],
    });
    const usersModify = users.map((user) => ({
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      status: user.status,
      createdAt: user.createdAt,
      paf: user.paf ? user.paf.name : "",
    }));
    res.json(usersModify);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const getManagerPaf = async (req, res) => {
  const { id } = req.params;
  try {
    const users = await User.findAll({
      where: {
        type: "gerente",
        "$paf.userId$": { [Op.or]: { [Op.eq]: null, [Op.eq]: id } },
      },
      attributes: [
        "id",
        "email",
        "first_name",
        "last_name",
        "username",
        "status",
        "createdAt",
      ],
      include: [{ model: Paf }],
    });
    const usersModify = users.map((user) => ({
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      status: user.status,
      createdAt: user.createdAt,
      paf: user.paf ? user.paf.name : "",
    }));
    res.json(usersModify);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const createUser = async (req, res) => {
  const {
    first_name,
    last_name,
    ci,
    address,
    telf,
    email,
    type,
    username,
    birthdate,
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

    await User.create({
      email,
      first_name,
      last_name,
      ci,
      address,
      telf,
      type,
      password: passwordHash,
      username,
      birthdate,
      status: true,
    });
    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [error] });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      where: { id },
      attributes: [
        "id",
        "email",
        "first_name",
        "last_name",
        "username",
        "status",
        "ci",
        "address",
        "telf",
        "birthdate",
        "type",
      ],
    });
    res.json(user);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const updateUser = async (req, res) => {
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
    } = req.body;

    const user = await User.findByPk(id);

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
    await user.save();
    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [error] });
  }
};

export const changeStatusUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    user.status = !user.status;
    user.save();
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const updatePasswordUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    const password = `${user.username}${user.ci}`;
    const passwordHash = await bcrypt.hash(password, 10); // hashaleatorio
    user.password = passwordHash;
    user.save();
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};
