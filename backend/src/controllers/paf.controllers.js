import { Paf } from "../models/Paf.js";
import { User } from "../models/User.js";

export const getPafs = async (req, res) => {
  try {
    const pafs = await Paf.findAll({
      include: [
        {
          model: User,
        },
      ],
    });
    const pafsModify = pafs.map((paf) => ({
      id: paf.id,
      name: paf.name,
      address: paf.address,
      type: paf.type,
      manager: paf.user ? paf.user.first_name + " " + paf.user.last_name : "",
      lat: paf.lat,
      log: paf.log,
      createdAt: paf.createdAt,
    }));
    res.json(pafsModify);
  } catch (error) {
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const getPaf = async (req, res) => {
  try {
    const { id } = req.params;
    const paf = await Paf.findOne({
      where: { id },
      include: [{ model: User }],
    });
    const data = {
      id: paf.id,
      name: paf.name,
      address: paf.address,
      type: paf.type,
      manager: paf.user ? paf.user.id : "",
      lat: paf.lat,
      log: paf.log,
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const createPaf = async (req, res) => {
  const { lat, log, name, address, type, manager } = req.body;
  try {
    await Paf.create({
      lat,
      log,
      name,
      address,
      type,
      userId: manager,
    });
    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [error] });
  }
};

export const updatePaf = async (req, res) => {
  try {
    const { id } = req.params;
    const { lat, log, name, address, type, manager } = req.body;
    const paf = await Paf.findByPk(id);
    paf.name = name;
    paf.address = address;
    paf.type = type;
    paf.userId = manager;
    paf.lat = lat;
    paf.log = log;
    await paf.save();
    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [error] });
  }
};
