import { Bag } from "../models/Bag.js";
import { Remesa } from "../models/Remesa.js";

//get bags
export const getBags = async (req, res) => {
    try {
        const bags = await Bag.findAll({
            attributes: [
                "id",
                "serial",
                "amount",
                "voBoParcial",
                "type",
                "others",
                "remesaId",
                "createdAt"]
        });
        res.json(bags);
    } catch (error) {
        res.status(500).json({
            errors: [error.message],
        });
    }
};

//get bag by id
export const getBag = async (req, res) => {
    try {
        const bag = await Bag.findByPk(req.params.id, {
            attributes: [
                "id",
                "serial",
                "amount",
                "voBoParcial",
                "type",
                "others",
                "remesaId",
                "createdAt"],
        });
        res.json(bag);
    } catch (error) {
        res.status(500).json({
            errors: [error.message],
        });
    }
};

//create bag
export const createBag = async (req, res) => {
    try {
        const {
            serial,
            amount,
            voBoParcial,
            type,
            others,
            remesaId
        } = req.body;
        await Bag.create({
            serial,
            amount,
            voBoParcial,
            type,
            others,
            remesaId
        });
        return res.sendStatus(204);
    } catch (error) {
        res.status(500).json({
            errors: [error.message],
        });
    }
};

//update bag
export const updateBag = async (req, res) => {
    try {
        const {
            serial,
            amount,
            voBoParcial,
            type,
            others,
            remesaId
        } = req.body;
        const bag = await Bag.findByPk(req.params.id);
        bag.serial = serial;
        bag.amount = amount;
        bag.voBoParcial = voBoParcial;
        bag.type = type;
        bag.others = others;
        bag.remesaId = remesaId;
        await bag.save();
        return res.sendStatus(204);
    } catch (error) {
        res.status(500).json({
            errors: [error.message],
        });
    }
};

//get bag by remesaId
export const getBagsByRemesaId = async (req, res) => {
    try {
        const bags = await Bag.findAll({
            where: {
                remesaId: req.params.id
            },
            attributes: [
                "id",
                "serial",
                "amount",
                "voBoParcial",
                "type",
                "others",
                "remesaId",
                "createdAt"],
            order: ["createdAt", "DESC"],
        });
        res.json(bags);
    } catch (error) {
        res.status(500).json({
            errors: [error.message],
        });
    }
};