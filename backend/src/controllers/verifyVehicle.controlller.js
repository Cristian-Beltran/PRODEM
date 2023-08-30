import { VerifyVehicle } from "../models/VerifyVehicle.js";

//get verifyVehicles
export const getVerifyVehicles = async (req, res) => {
    try {
        const verifyVehicles = await VerifyVehicle.findAll(
            {
                attibutes: [
                    "id",
                    "km",
                    "lightParking",
                    "lightLow",
                    "lightHigh",
                    "lightReverse",
                    "lightTravel",
                    "equipmentFlasher",
                    "equipmentHooter",
                    "equipmentMailbox",
                    "equipmentGlass",
                    "equipmentPI",
                    "brakeHand",
                    "brakeFoot",
                    "brakeOther",
                    "communicationGPS",
                    "communicationGSM",
                    "communicationContingency",
                    "tireFR",
                    "tireFL",
                    "tireBR",
                    "tireBL",
                    "tireReplace",
                    "contingenciesMask",
                    "contingenciesOxigen",
                    "contingenciesTriangles",
                    "contingenciesKit",
                    "contingenciesExtinguisher1",
                    "contingenciesExtinguisher2",
                    "daHydraulicjack",
                    "daWheelwrench",
                    "daSeatbelt",
                    "daMirrors",
                    "daBhorn",
                    "daLocks",
                    "bulletproofdriver",
                    "bulletproofP1",
                    "bulletproofP2",
                    "bulletproofG1",
                    "bulletproofG2",
                    "fuel",
                    "observations",
                ]
            }
        );
        res.json(verifyVehicles);
    } catch (error) {
        res.status(500).json({
            errors: [error.message],
        });
    }
}

//get verifyVehicle by id
export const getVerifyVehicle = async (req, res) => {
    try {
        const { id } = req.params;
        const verifyVehicle = await VerifyVehicle.findOne({
            where: { id },
            attributes: [
                "id",
                "km",
                "lightParking",
                "lightLow",
                "lightHigh",
                "lightReverse",
                "lightTravel",
                "equipmentFlasher",
                "equipmentHooter",
                "equipmentMailbox",
                "equipmentGlass",
                "equipmentPI",
                "brakeHand",
                "brakeFoot",
                "brakeOther",
                "communicationGPS",
                "communicationGSM",
                "communicationContingency",
                "tireFR",
                "tireFL",
                "tireBR",
                "tireBL",
                "tireReplace",
                "contingenciesMask",
                "contingenciesOxigen",
                "contingenciesTriangles",
                "contingenciesKit",
                "contingenciesExtinguisher1",
                "contingenciesExtinguisher2",
                "daHydraulicjack",
                "daWheelwrench",
                "daSeatbelt",
                "daMirrors",
                "daBhorn",
                "daLocks",
                "bulletproofdriver",
                "bulletproofP1",
                "bulletproofP2",
                "bulletproofG1",
                "bulletproofG2",
                "fuel",
                "observations",
            ]
        });
        res.json(verifyVehicle);
    } catch (error) {
        res.status(500).json({
            errors: [error.message],
        });
    }
}

//create verifyVehicle
export const createVerifyVehicle = async (req, res) => {
    try {
        const {
            km,
            lightParking,
            lightLow,
            lightHigh,
            lightReverse,
            lightTravel,
            equipmentFlasher,
            equipmentHooter,
            equipmentMailbox,
            equipmentGlass,
            equipmentPI,
            brakeHand,
            brakeFoot,
            brakeOther,
            communicationGPS,
            communicationGSM,
            communicationContingency,
            tireFR,
            tireFL,
            tireBR,
            tireBL,
            tireReplace,
            contingenciesMask,
            contingenciesOxigen,
            contingenciesTriangles,
            contingenciesKit,
            contingenciesExtinguisher1,
            contingenciesExtinguisher2,
            daHydraulicjack,
            daWheelwrench,
            daSeatbelt,
            daMirrors,
            daBhorn,
            daLocks,
            bulletproofdriver,
            bulletproofP1,
            bulletproofP2,
            bulletproofG1,
            bulletproofG2,
            fuel,
            observations,
        } = req.body;

        const verifyVehicle = await VerifyVehicle.create({
            km,
            lightParking,
            lightLow,
            lightHigh,
            lightReverse,
            lightTravel,
            equipmentFlasher,
            equipmentHooter,
            equipmentMailbox,
            equipmentGlass,
            equipmentPI,
            brakeHand,
            brakeFoot,
            brakeOther,
            communicationGPS,
            communicationGSM,
            communicationContingency,
            tireFR,
            tireFL,
            tireBR,
            tireBL,
            tireReplace,
            contingenciesMask,
            contingenciesOxigen,
            contingenciesTriangles,
            contingenciesKit,
            contingenciesExtinguisher1,
            contingenciesExtinguisher2,
            daHydraulicjack,
            daWheelwrench,
            daSeatbelt,
            daMirrors,
            daBhorn,
            daLocks,
            bulletproofdriver,
            bulletproofP1,
            bulletproofP2,
            bulletproofG1,
            bulletproofG2,
            fuel,
            observations,
        });

        res.json(verifyVehicle);
    } catch (error) {
        res.status(500).json({
            errors: [error.message],
        });
    }
}

//update verifyVehicle
export const updateVerifyVehicle = async (req, res) => {
    try {
        const { id } = req.params
        const {
            km,
            lightParking,
            lightLow,
            lightHigh,
            lightReverse,
            lightTravel,
            equipmentFlasher,
            equipmentHooter,
            equipmentMailbox,
            equipmentGlass,
            equipmentPI,
            brakeHand,
            brakeFoot,
            brakeOther,
            communicationGPS,
            communicationGSM,
            communicationContingency,
            tireFR,
            tireFL,
            tireBR,
            tireBL,
            tireReplace,
            contingenciesMask,
            contingenciesOxigen,
            contingenciesTriangles,
            contingenciesKit,
            contingenciesExtinguisher1,
            contingenciesExtinguisher2,
            daHydraulicjack,
            daWheelwrench,
            daSeatbelt,
            daMirrors,
            daBhorn,
            daLocks,
            bulletproofdriver,
            bulletproofP1,
            bulletproofP2,
            bulletproofG1,
            bulletproofG2,
            fuel,
            observations,
        } = req.body;
        const verifyVehicle = await VerifyVehicle.findByPk(id)
        verifyVehicle.km = km
        verifyVehicle.lightParking = lightParking
        verifyVehicle.lightLow = lightLow
        verifyVehicle.lightHigh = lightHigh
        verifyVehicle.lightReverse = lightReverse
        verifyVehicle.lightTravel = lightTravel
        verifyVehicle.equipmentFlasher = equipmentFlasher
        verifyVehicle.equipmentHooter = equipmentHooter
        verifyVehicle.equipmentMailbox = equipmentMailbox
        verifyVehicle.equipmentGlass = equipmentGlass
        verifyVehicle.equipmentPI = equipmentPI
        verifyVehicle.brakeHand = brakeHand
        verifyVehicle.brakeFoot = brakeFoot
        verifyVehicle.brakeOther = brakeOther
        verifyVehicle.communicationGPS = communicationGPS
        verifyVehicle.communicationGSM = communicationGSM
        verifyVehicle.communicationContingency = communicationContingency
        verifyVehicle.tireFR = tireFR
        verifyVehicle.tireFL = tireFL
        verifyVehicle.tireBR = tireBR
        verifyVehicle.tireBL = tireBL
        verifyVehicle.tireReplace = tireReplace
        verifyVehicle.contingenciesMask = contingenciesMask
        verifyVehicle.contingenciesOxigen = contingenciesOxigen
        verifyVehicle.contingenciesTriangles = contingenciesTriangles
        verifyVehicle.contingenciesKit = contingenciesKit
        verifyVehicle.contingenciesExtinguisher1 = contingenciesExtinguisher1
        verifyVehicle.contingenciesExtinguisher2 = contingenciesExtinguisher2
        verifyVehicle.daHydraulicjack = daHydraulicjack
        verifyVehicle.daWheelwrench = daWheelwrench
        verifyVehicle.daSeatbelt = daSeatbelt
        verifyVehicle.daMirrors = daMirrors
        verifyVehicle.daBhorn = daBhorn
        verifyVehicle.daLocks = daLocks
        verifyVehicle.bulletproofdriver = bulletproofdriver
        verifyVehicle.bulletproofP1 = bulletproofP1
        verifyVehicle.bulletproofP2 = bulletproofP2
        verifyVehicle.bulletproofG1 = bulletproofG1
        verifyVehicle.bulletproofG2 = bulletproofG2
        verifyVehicle.fuel = fuel
        verifyVehicle.observations = observations
        await fueling.save()
        return res.sendStatus(204)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: [error] })
    }
}

//get verifyVehicle by vehicle id
export const getVerifyVehicleByVehicleId = async (req, res) => {
    try {
        const { id } = req.params
        const verifyVehicle = await VerifyVehicle.findAll({
            where: { vehicleId: id },
            attributes: [
                "id",
                "km",
                "lightParking",
                "lightLow",
                "lightHigh",
                "lightReverse",
                "lightTravel",
                "equipmentFlasher",
                "equipmentHooter",
                "equipmentMailbox",
                "equipmentGlass",
                "equipmentPI",
                "brakeHand",
                "brakeFoot",
                "brakeOther",
                "communicationGPS",
                "communicationGSM",
                "communicationContingency",
                "tireFR",
                "tireFL",
                "tireBR",
                "tireBL",
                "tireReplace",
                "contingenciesMask",
                "contingenciesOxigen",
                "contingenciesTriangles",
                "contingenciesKit",
                "contingenciesExtinguisher1",
                "contingenciesExtinguisher2",
                "daHydraulicjack",
                "daWheelwrench",
                "daSeatbelt",
                "daMirrors",
                "daBhorn",
                "daLocks",
                "bulletproofdriver",
                "bulletproofP1",
                "bulletproofP2",
                "bulletproofG1",
                "bulletproofG2",
                "fuel",
                "observations",
            ]
        });
        res.json(verifyVehicle);
    } catch (error) {
        res.status(500).json({
            errors: [error.message],
        });
    }
}

//get verifyVehicle by driver id
export const getVerifyVehicleByDriverId = async (req, res) => {
    try {
        const { id } = req.params
        const verifyVehicle = await VerifyVehicle.findAll({
            where: { vehicleId: id },
            attributes: [
                "id",
                "km",
                "lightParking",
                "lightLow",
                "lightHigh",
                "lightReverse",
                "lightTravel",
                "equipmentFlasher",
                "equipmentHooter",
                "equipmentMailbox",
                "equipmentGlass",
                "equipmentPI",
                "brakeHand",
                "brakeFoot",
                "brakeOther",
                "communicationGPS",
                "communicationGSM",
                "communicationContingency",
                "tireFR",
                "tireFL",
                "tireBR",
                "tireBL",
                "tireReplace",
                "contingenciesMask",
                "contingenciesOxigen",
                "contingenciesTriangles",
                "contingenciesKit",
                "contingenciesExtinguisher1",
                "contingenciesExtinguisher2",
                "daHydraulicjack",
                "daWheelwrench",
                "daSeatbelt",
                "daMirrors",
                "daBhorn",
                "daLocks",
                "bulletproofdriver",
                "bulletproofP1",
                "bulletproofP2",
                "bulletproofG1",
                "bulletproofG2",
                "fuel",
                "observations",
            ]
        });
        res.json(verifyVehicle);
    } catch (error) {
        res.status(500).json({
            errors: [error.message],
        });
    }
}

//get verifyVehicle by user id
export const getVerifyVehicleByUserId = async (req, res) => {
    try {
        const { id } = req.params
        const verifyVehicle = await VerifyVehicle.findAll({
            where: { vehicleId: id },
            attributes: [
                "id",
                "km",
                "lightParking",
                "lightLow",
                "lightHigh",
                "lightReverse",
                "lightTravel",
                "equipmentFlasher",
                "equipmentHooter",
                "equipmentMailbox",
                "equipmentGlass",
                "equipmentPI",
                "brakeHand",
                "brakeFoot",
                "brakeOther",
                "communicationGPS",
                "communicationGSM",
                "communicationContingency",
                "tireFR",
                "tireFL",
                "tireBR",
                "tireBL",
                "tireReplace",
                "contingenciesMask",
                "contingenciesOxigen",
                "contingenciesTriangles",
                "contingenciesKit",
                "contingenciesExtinguisher1",
                "contingenciesExtinguisher2",
                "daHydraulicjack",
                "daWheelwrench",
                "daSeatbelt",
                "daMirrors",
                "daBhorn",
                "daLocks",
                "bulletproofdriver",
                "bulletproofP1",
                "bulletproofP2",
                "bulletproofG1",
                "bulletproofG2",
                "fuel",
                "observations",
            ]
        });
        res.json(verifyVehicle);
    } catch (error) {
        res.status(500).json({
            errors: [error.message],
        });
    }
}