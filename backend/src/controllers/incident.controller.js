import { Incident } from "../models/Incident.js";

export const getIncedents = async (req, res) => {
  try {
    const incidents = await Incident.findAll({
      attributes: [
        "id",
        "description",
        "priority",
        "completedAt",
        "status",
        "createdAt",
      ],
      order: [["status","ASC"],["createdAt", "DESC"]],
    });
    res.json(incidents);
  } catch (error) {
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const getIncident = async (req, res) => {
  try {
    const { id } = req.params;
    const incident = await Incident.findOne({
      where: { id },
      attributes: [
        "id",
        "description",
        "priority",
        "completedAt",
        "status",
        "informedBy",
        "assignedTo",
        "createdAt",
        "comments",
      ],
    });
    res.json(incident);
  } catch (error) {
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const createIncident = async (req, res) => {
  const { description, priority, informedBy, assignedTo, comments } = req.body;
  try {
    await Incident.create({
      description,
      priority,
      informedBy,
      assignedTo,
      comments,
      status: false,
    });
    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [error] });
  }
};

export const updateIncedent = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, priority, informedBy, assignedTo, comments } =
      req.body;

    const incident = await Incident.findByPk(id);
    incident.description = description;
    incident.priority = priority;
    incident.informedBy = informedBy;
    incident.assignedTo = assignedTo;
    incident.comments = comments;
    await incident.save();
    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [error] });
  }
};

export const completeIncident = async (req, res) => {
  const { id } = req.params;
  try {
    const incident = await Incident.findByPk(id);
    incident.status = true;
    incident.completedAt = new Date();
    await incident.save();
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};
