//import fueling model
import { Fueling } from "../models/Fueling.js"
import { Op } from 'sequelize'

//get fueling
export const getFuelings = async (req, res) => {
    try {
        const fuelings = await Fueling.findAll({
            attributes: [
                "id",
                "nInvoce",
                "partialFull",
                "price",
                "liters",
                "fuelType",
                "obvservations",
                "createdAt",
            ],
            order: ["createdAt", "DESC"],
        });
        res.json(fuelings)
    } catch (error) {
        res.status(500).json({
            errors: [error.message],
        })
    }
}

//get fueling by id
export const getFueling = async (req, res) => {
    try {
        const { id } = req.params
        const fueling = await Fueling.findOne({
            where: { id },
            attributes: [
                "id",
                "nInvoce",
                "partialFull",
                "kmStart",
                "kmEnd",
                "price",
                "liters",
                "fuelType",
                "typeOfRoad",
                "obvservations",
                "createdAt",
            ],
        });
        res.json(fueling);
    } catch (error) {
        res.status(500).json({
            errors: [error.message],
        })
    }
}

//create fueling
export const createFueling = async (req, res) => {
    try {
        const {
            nInvoce,
            partialFull,
            kmStart,
            kmEnd,
            price,
            liters,
            fuelType,
            typeOfRoad,
            obvservations,
        } = req.body;
        await Fueling.create({
            nInvoce,
            partialFull,
            kmStart,
            kmEnd,
            price,
            liters,
            fuelType,
            typeOfRoad,
            obvservations,
        })
        return res.sendStatus(204);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errors: [error] })
    }
}

//update fueling
export const updateFueling = async (req, res) => {
    try {
        const { id } = req.params
        const {
            nInvoce,
            partialFull,
            kmStart,
            kmEnd,
            price,
            liters,
            fuelType,
            typeOfRoad,
            obvservations,
        } = req.body;
        const fueling = await Fueling.findByPk(id)
        fueling.nInvoce = nInvoce
        fueling.partialFull = partialFull
        fueling.kmStart = kmStart
        fueling.kmEnd = kmEnd
        fueling.price = price
        fueling.liters = liters
        fueling.fuelType = fuelType
        fueling.typeOfRoad = typeOfRoad
        fueling.obvservations = obvservations
        await fueling.save()
        return res.sendStatus(204)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: [error] })
    }
}

//get fueling by vehicle id
export const getFuelingsByVehicleId = async (req, res) => {
    try {
        const { id } = req.params
        const fuelings = await Fueling.findAll({
            where: { vehicleId: id },
            attributes: [
                "id",
                "nInvoce",
                "partialFull",
                "kmStart",
                "kmEnd",
                "price",
                "liters",
                "fuelType",
                "typeOfRoad",
                "obvservations",
                "createdAt",
            ],
            order: ["createdAt", "DESC"],
        });
        res.json(fuelings)
    } catch (error) {
        res.status(500).json({
            errors: [error.message],
        });
    }
}

//get fueling by driver id
export const getFuelingsByDriverId = async (req, res) => {
    try {
        const { id } = req.params
        const fuelings = await Fueling.findAll({
            where: { driverId: id },
            attributes: [
                "id",
                "nInvoce",
                "partialFull",
                "kmStart",
                "kmEnd",
                "price",
                "liters",
                "fuelType",
                "typeOfRoad",
                "obvservations",
                "createdAt",
            ],
            order: ["createdAt", "DESC"],
        });
        res.json(fuelings)
    } catch (error) {
        res.status(500).json({
            errors: [error.message],
        });
    }
}

//get fueling by month and year
export const getFuelingsByMonthAndYear = async (req, res) => {
    try {
        const { month, year } = req.params
        const fuelings = await Fueling.findAll({
            where: {
                createdAt: {
                    [Op.gte]: new Date(`${year}-${month}-01`),
                    [Op.lte]: new Date(`${year}-${month}-31`),
                },
            },
            attributes: [
                "id",
                "nInvoce",
                "partialFull",
                "kmStart",
                "kmEnd",
                "price",
                "liters",
                "fuelType",
                "typeOfRoad",
                "obvservations",
                "createdAt",
            ],
            order: ["createdAt", "DESC"],
        });
        res.json(fuelings)
    } catch (error) {
        res.status(500).json({
            errors: [error.message],
        });
    }
}