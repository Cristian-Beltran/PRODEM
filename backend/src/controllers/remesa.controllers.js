import { Remesa } from "../models/Remesa.js";
import { Bag } from "../models/Bag.js";
import { User } from "../models/User.js";
import { Paf } from "../models/Paf.js";
import { Route } from "../models/Route.js";
import { Op } from "sequelize";
import CryptoJS from "crypto-js";
import { TOKEN_SECRET } from "../config.js";

export const getRemesasSender = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    const paf = await Paf.findOne({
      where: { userId: user.id },
    });
    if (!paf)
      return res.json({ errors: ["No tiene PAF asignada"] }).status(409);

    const remesas = await Remesa.findAll({
      where: { sender: paf.id, deadline: null },
      include: [
        { model: Paf, as: "Addressee" },
        { model: Paf, as: "Sender" },
      ],
    });

    const data = remesas.map((remesa) => ({
      id: remesa.id,
      addressee: remesa?.Addressee?.name,
      sender: remesa?.Sender?.name,
      order: remesa.order,
      typeOfService: remesa.typeOfService,
      subType: remesa.subType,
      createdAt: remesa.createdAt,
      senderDate: remesa.senderDate,
      deadline: remesa.deadline,
    }));
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [error.message],
    });
  }
};
export const getRemesasReceive = async (req, res) => {
  try {
    const paf = await Paf.findOne({
      where: { userId: req.user.id },
    });
    if (!paf)
      return res.json({ errors: ["No tiene PAF asignada"] }).status(409);
    const remesas = await Remesa.findAll({
      where: { addressee: paf.id, deadline: null },
      include: [
        { model: Paf, as: "Addressee" },
        { model: Paf, as: "Sender" },
      ],
    });
    const data = remesas.map((remesa) => ({
      id: remesa.id,
      addressee: remesa?.Addressee?.name,
      sender: remesa?.Sender?.name,
      order: remesa.order,
      typeOfService: remesa.typeOfService,
      subType: remesa.subType,
      createdAt: remesa.createdAt,
      senderDate: remesa.senderDate,
      deadline: remesa.deadline,
    }));
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const getRemesasCompleteByManager = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    const paf = await Paf.findOne({
      where: { userId: user.id },
    });
    if (!paf)
      return res.json({ errors: ["No tiene PAF asignada"] }).status(409);

    const remesas = await Remesa.findAll({
      where: {
        deadline: { [Op.not]: null },
        [Op.or]: {
          sender: paf.id,
          addressee: paf.id,
        },
      },
      include: [
        { model: Paf, as: "Addressee" },
        { model: Paf, as: "Sender" },
      ],
    });
    const data = remesas.map((remesa) => ({
      id: remesa.id,
      addressee: remesa?.Addressee?.name,
      sender: remesa?.Sender?.name,
      order: remesa.order,
      typeOfService: remesa.typeOfService,
      subType: remesa.subType,
      createdAt: remesa.createdAt,
      senderDate: remesa.senderDate,
      deadline: remesa.deadline,
    }));
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const getRemesasComplete = async (req, res) => {
  try {
    const remesas = await Remesa.findAll({
      where: {
        deadline: { [Op.not]: null },
      },
      include: [
        { model: Paf, as: "Addressee" },
        { model: Paf, as: "Sender" },
      ],
    });
    const data = remesas.map((remesa) => ({
      id: remesa.id,
      addressee: remesa?.Addressee?.name,
      sender: remesa?.Sender?.name,
      order: remesa.order,
      typeOfService: remesa.typeOfService,
      subType: remesa.subType,
      createdAt: remesa.createdAt,
    }));
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [error.message],
    });
  }
};
export const getRemesasIncomplete = async (req, res) => {
  try {
    const remesas = await Remesa.findAll({
      where: { deadline: null },
      include: [
        { model: Paf, as: "Addressee" },
        { model: Paf, as: "Sender" },
      ],
    });
    const data = remesas.map((remesa) => ({
      id: remesa.id,
      addressee: remesa?.Addressee?.name,
      sender: remesa?.Sender?.name,
      order: remesa.order,
      typeOfService: remesa.typeOfService,
      subType: remesa.subType,
      createdAt: remesa.createdAt,
      senderDate: remesa.senderDate,
      deadline: remesa.deadline,
    }));
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [error.message] });
  }
};

export const createRemesa = async (req, res) => {
  try {
    const paf = await Paf.findOne({ where: { userId: req.user.id } });
    const remesa = await Remesa.findOne({
      where: { addressee: paf.id, senderDate: null },
    });
    if (remesa)
      return res
        .json({ errors: ["Ya tiene una remesa pendiente"] })
        .status(500);
    await Remesa.create({
      addressee: paf.id,
    });
    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [error] });
  }
};

export const updateRemesaByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { order, typeOfService, subType, sender } = req.body;
    const remesa = await Remesa.findByPk(id);
    remesa.order = order;
    remesa.typeOfService = typeOfService;
    remesa.subType = subType;
    if (remesa.sender && remesa.sender != sender) {
      await Bag.destroy({ where: { remesaId: remesa.id } });
      remesa.sender = sender;
      remesa.content = null;
      (remesa.observarions = null), await remesa.save();
      return res.sendStatus(204);
    }
    remesa.sender = sender;
    await remesa.save();
    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [error] });
  }
};

export const updateRemesaByManager = async (req, res) => {
  const { id } = req.params;
  const { content, observations, bags } = req.body;
  const remesa = await Remesa.findByPk(id);
  remesa.content = content;
  remesa.observations = observations;
  await remesa.save();
  await Bag.destroy({ where: { remesaId: remesa.id } });
  console.log(bags);
  if (bags.length > 0) {
    const newBags = bags.map((bag) => {
      if (bag.serial && bag.amount && bag.type)
        return {
          serial: bag.serial,
          amount: bag.amount,
          type: bag.type,
          remesaId: remesa.id,
        };
    });
    await Bag.bulkCreate(newBags);
    return res.sendStatus(204);
  }
  return res.sendStatus(204);
};

export const deleteRemesa = async (req, res) => {
  const { id } = req.params;
  try {
    const remesa = await Remesa.findByPk(id);
    if (remesa?.senderDate != null)
      return res.json({ errors: ["No es posible eliminar"] }).status(409);
    await Remesa.destroy({
      where: { id },
    });
    await Bag.destroy({
      where: { remesaId: id },
    });
    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [error] });
  }
};

export const getRemesa = async (req, res) => {
  const { id } = req.params;
  try {
    const remesa = await Remesa.findByPk(id, {
      include: [
        {
          model: Bag,
        },
        {
          model: Paf,
          as: "Addressee",
          include: [{ model: User }],
        },
        {
          model: Paf,
          as: "Sender",
          include: [{ model: User }],
        },
        {
          model: User,
          as: "CarriesValue1",
        },
        {
          model: User,
          as: "CarriesValue2",
        },
      ],
    });
    if (!remesa) return res.sendStatus(404);
    return res.json(remesa);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [error] });
  }
};

export const getRemesasRoute = async (req, res) => {
  try {
    const { id } = req.params;
    const remesas = await Remesa.findAll({
      where: {
        deadline: null,
        content: { [Op.or]: [{ [Op.not]: null }, { [Op.not]: "" }] },
        routeId: { [Op.or]: [id, null] },
      },
      include: [
        { model: Paf, as: "Addressee" },
        { model: Paf, as: "Sender" },
      ],
    });

    const data = remesas.map((remesa) => ({
      id: remesa.id,
      addressee: remesa?.Addressee?.name,
      sender: remesa?.Sender?.name,
      order: remesa.order,
      typeOfService: remesa.typeOfService,
      subType: remesa.subType,
      createdAt: remesa.createdAt,
      senderDate: remesa.senderDate,
      deadline: remesa.deadline,
      check: remesa.routeId == id,
    }));
    res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [error] });
  }
};
export const getRemesasRouteComplete = async (req, res) => {
  try {
    const { id } = req.params;
    const remesas = await Remesa.findAll({
      where: {
        deadline: { [Op.not]: null },
        content: { [Op.or]: [{ [Op.not]: null }, { [Op.not]: "" }] },
        routeId: { [Op.or]: [id, null] },
      },
      include: [
        { model: Paf, as: "Addressee" },
        { model: Paf, as: "Sender" },
      ],
    });

    const data = remesas.map((remesa) => ({
      id: remesa.id,
      addressee: remesa?.Addressee?.name,
      sender: remesa?.Sender?.name,
      order: remesa.order,
      typeOfService: remesa.typeOfService,
      subType: remesa.subType,
      createdAt: remesa.createdAt,
      senderDate: remesa.senderDate,
      deadline: remesa.deadline,
      check: remesa.routeId == id,
    }));
    res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [error] });
  }
};

export const generateHash = async (req, res) => {
  try {
    const { id } = req.params;
    const hash = CryptoJS.AES.encrypt(id, TOKEN_SECRET).toString();
    return res.json({ hash });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [error] });
  }
};

export const sendRemesa = async (req, res) => {
  try {
    const { hash } = req.params;
    const bytes = CryptoJS.AES.decrypt(hash, TOKEN_SECRET);
    const id = bytes.toString(CryptoJS.enc.Utf8);
    const remesa = await Remesa.findByPk(id);
    if (!remesa)
      return res.status(404).json({ errors: ["Remesa no encontrada"] });
    if (remesa.senderDate)
      return res.status(500).json({
        errors: ["Remesa ya enviada"],
      });
    remesa.senderDate = new Date();
    remesa.save();
    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [error] });
  }
};

export const receiveRemesa = async (req, res) => {
  try {
    const { hash } = req.params;
    const bytes = CryptoJS.AES.decrypt(hash, TOKEN_SECRET);
    const id = bytes.toString(CryptoJS.enc.Utf8);
    const remesa = await Remesa.findByPk(id);
    if (!remesa)
      return res.status(404).json({ errors: ["Remesa no encontrada"] });
    if (!remesa.senderDate && remesa.deadline)
      return res.status(500).json({
        errors: ["Remesa aun no enviada"],
      });
    if (remesa.deadline) {
      return res.status(500).json({ errors: ["Remesa ya recibida"] });
    }
    const remesas = await Remesa.findAll({
      where: { routeId: remesa.routeId, deadline: null },
    });
    if (remesas.length === 1) {
      const route = await Route.findByPk(remesa.routeId);
      route.complete = true;
      route.save();
    }
    remesa.deadline = new Date();
    remesa.save();
    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [error] });
  }
};
