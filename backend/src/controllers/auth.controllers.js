import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import { createdAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import { Op } from "sequelize";

export const login = async (req, res) => {
  const { emailOrUser, password } = req.body;
  try {
    const userFound = await User.findOne({
      where: {
        [Op.or]: [{ email: emailOrUser }, { username: emailOrUser }],
        status: true,
      },
      attributes: [
        "id",
        "email",
        "password",
        "first_name",
        "last_name",
        "username",
        "ci",
        "telf",
        "address",
        "birthdate",
        "status",
        "type",
      ],
    });
    if (!userFound)
      return res.status(404).json({ errors: ["Usario incorrecto"] });

    const isMatch = await bcrypt.compare(password, userFound.password); // hashaleatorio

    if (!isMatch)
      return res.status(404).json({ errors: ["Contraseña incorrecta"] });

    const token = await createdAccessToken({
      id: userFound.id,
    });

    res.json({
      id: userFound.id,
      email: userFound.email,
      first_name: userFound.first_name,
      last_name: userFound.last_name,
      username: userFound.username,
      ci: userFound.ci,
      address: userFound.address,
      telf: userFound.telf,
      birthdate: userFound.birthdate,
      type: userFound.type,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const updatePassword = async (req, res) => {
  const { newPassword, oldPassword, repeatPassword } = req.body;
  try {
    const userFound = await User.findByPk(req.user.id);
    if (!userFound)
      return res.status(404).json({ errors: ["Usuario no encontrado"] });

    const isMatch = await bcrypt.compare(oldPassword, userFound.password); // hashaleatorio

    if (!isMatch)
      return res.status(500).json({ errors: ["Contraseña incorrecta"] });

    const passwordHash = await bcrypt.hash(newPassword, 10); // hashaleatorio
    userFound.password = passwordHash;
    userFound.save();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const profile = async (req, res) => {
  try {
    const userFound = await User.findByPk(req.user.id);
    if (!userFound)
      return res.status(400).json({ errors: ["Usuario no encontrado"] });
    res.json({
      id: userFound.id,
      email: userFound.email,
      first_name: userFound.first_name,
      last_name: userFound.last_name,
      username: userFound.username,
      ci: userFound.ci,
      address: userFound.address,
      telf: userFound.telf,
      birthdate: userFound.birthdate,
      type: userFound.type,
    });
  } catch (error) {
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const verifyToken = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ errors: ["No autorizado"] });
    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
      if (err) return res.status(401).json({ errors: ["No autorizado"] });

      const userFound = await User.findByPk(user.id);
      if (!userFound)
        return res.status(401).json({ errors: ["No autorizado"] });
      res.json({
        id: userFound.id,
        email: userFound.email,
        first_name: userFound.first_name,
        last_name: userFound.last_name,
        username: userFound.username,
        ci: userFound.ci,
        address: userFound.address,
        telf: userFound.telf,
        birthdate: userFound.birthdate,
        type: userFound.type,
      });
    });
  } catch (error) {
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { first_name, last_name, ci, address, telf, birthdate } = req.body;
    const user = await User.findByPk(req.user.id);

    if (!user)
      return res.status(400).json({ errors: ["Usuario no encontrado"] });

    const userCi = await User.findOne({
      where: { ci, id: { [Op.ne]: req.user.id } },
    });
    if (userCi)
      res.status(500).json({ errors: ["Carnet de identidad ya ingresado"] });

    user.first_name = first_name;
    user.last_name = last_name;
    user.ci = ci;
    user.address = address;
    user.telf = telf;
    user.birthdate = birthdate;
    await user.save();
    res.json({
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      ci: user.ci,
      address: user.address,
      telf: user.telf,
      birthdate: user.birthdate,
      type: user.type,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [error.message],
    });
  }
};
