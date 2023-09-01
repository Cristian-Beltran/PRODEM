import { TypeMaintenances } from "../models/Maintenance.js";

//get typeMaintenances
export const getTypeMaintenances = async (req, res) => {
    try {
        const typeMaintenances = await TypeMaintenances.findAll({
            attributes: [
                "id",
                "name",
                "detail",
                "createdAt",
            ],
            order: ["createdAt", "DESC"],
        });
        res.json(typeMaintenances);
    } catch (error) {
        res.status(500).json({
            errors: [error.message],
        });
    }
};

//get typeMaintenances by id
export const getTypeMaintenance = async (req, res) => {
    try {
        const { id } = req.params;
        const typeMaintenance = await TypeMaintenances.findOne({
            where: { id },
            attributes: [
                "id",
                "name",
                "detail",
                "createdAt",
            ],
        });
        res.json(typeMaintenance);
    } catch (error) {
        res.status(500).json({
            errors: [error.message],
        });
    }
};

//create typeMaintenance
export const createTypeMaintenance = async (req, res) => {
    try {
        const { name, detail } = req.body;
        const typeMaintenance = await TypeMaintenances.create({
            name,
            detail,
        });
        res.json(typeMaintenance);
    } catch (error) {
        res.status(500).json({
            errors: [error.message],
        });
    }
}

//update typeMaintenance
export const updateTypeMaintenance = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, detail } = req.body;
        const typeMaintenance = await TypeMaintenances.findPk(id)
        typeMaintenance.name = name
        typeMaintenance.detail = detail
        await typeMaintenance.save()
        return res.sendStatus(204)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errors: [error] });
    }
};