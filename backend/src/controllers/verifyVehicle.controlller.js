import { VerifyVehicle } from "../models/VerifyVehicle.js";
import { User, Driver } from "../models/User.js";
import { Vehicle } from "../models/Vehicle.js"

//get verifyVehicles
export const getVerifyVehicles = async (req, res) => {
    try {
        const verifyVehicles = await VerifyVehicle.findAll({
            include: [{
                model: Driver,
                model: User,
                model: Vehicle
            }],
            raw: true,
        });

        // Formatear los resultados antes de enviarlos
        const formattedVerifyVehicles = verifyVehicles.map((verifyVehicles) => ({
            id: verifyVehicles.id,
            km: verifyVehicles.km,
            lightParking: verifyVehicles.lightParking,
            lightLow: verifyVehicles.lightLow,
            lightHigh: verifyVehicles.lightHigh,
            lightReverse: verifyVehicles.lightReverse,
            lightTravel: verifyVehicles.lightTravel,
            equipmentFlasher: verifyVehicles.equipmentFlasher,
            equipmentHooter: verifyVehicles.equipmentHooter,
            equipmentMailbox: verifyVehicles.equipmentMailbox,
            equipmentGlass: verifyVehicles.equipmentGlass,
            equipmentPI: verifyVehicles.equipmentPI,
            brakeHand: verifyVehicles.brakeHand,
            brakeFoot: verifyVehicles.brakeFoot,
            brakeOther: verifyVehicles.brakeOther,
            communicationGPS: verifyVehicles.communicationGPS,
            communicationGSM: verifyVehicles.communicationGSM,
            communicationContingency: verifyVehicles.communicationContingency,
            tireFR: verifyVehicles.tireFR,
            tireFL: verifyVehicles.tireFL,
            tireBR: verifyVehicles.tireBR,
            tireBL: verifyVehicles.tireBL,
            tireReplace: verifyVehicles.tireReplace,
            contingenciesMask: verifyVehicles.contingenciesMask,
            contingenciesOxigen: verifyVehicles.contingenciesOxigen,
            contingenciesTriangles: verifyVehicles.contingenciesTriangles,
            contingenciesKit: verifyVehicles.contingenciesKit,
            contingenciesExtinguisher1: verifyVehicles.contingenciesExtinguisher1,
            contingenciesExtinguisher2: verifyVehicles.contingenciesExtinguisher2,
            daHydraulicjack: verifyVehicles.daHydraulicjack,
            daWheelwrench: verifyVehicles.daWheelwrench,
            daSeatbelt: verifyVehicles.daSeatbelt,
            daMirrors: verifyVehicles.daMirrors,
            daBhorn: verifyVehicles.daBhorn,
            daLocks: verifyVehicles.daLocks,
            bulletproofdriver: verifyVehicles.bulletproofdriver,
            bulletproofP1: verifyVehicles.bulletproofP1,
            bulletproofP2: verifyVehicles.bulletproofP2,
            bulletproofG1: verifyVehicles.bulletproofG1,
            bulletproofG2: verifyVehicles.bulletproofG2,
            fuel: verifyVehicles.fuel,
            observations: verifyVehicles.observations,
            driver: verifyVehicles.driverId,
            guard: verifyVehicles.guardId,
            vehicle: verifyVehicles.vehicleId,
            createdAt: verifyVehicles.createdAt,
        }));
        res.json(formattedVerifyVehicles);
    } catch (error) {
        res.status(500).json({
            errors: [error.message],
        });
    }
};

//get verifyVehicle by id
export const getVerifyVehicle = async (req, res) => {
    try {
        const { id } = req.params;
        const verifyVehicles = await VerifyVehicle.findOne({
            where: { id },
            include: [
                { model: User },
                { model: Driver },
                { model: Vehicle }],
                raw: true,
        });

        const driverId = verifyVehicles.driverId
        const guardId = verifyVehicles.guardId
        const vehicleId = verifyVehicles.vehicleId

        // Buscar el conductor por el ID
        const driver = await Driver.findOne({
            where: { id: driverId }
        });

        // Obtener el userId del conductor
        const userId = driver.userId;

        // Buscar al usuario/driver por su ID
        const user = await User.findOne({
            where: { id: userId }
        });

        // Buscar guardia por ID
        const guard = await User.findOne({
            where: { id: guardId }
        });

        // Buscar vehiculo por ID
        const vehicle = await Vehicle.findOne({
            where: { id: vehicleId }
        });

        // Formatear los resultados antes de enviarlos
        const data = {
            id: verifyVehicles.id,
            nInvoce: verifyVehicles.nInvoce,
            detail: verifyVehicles.detail,
            amount: verifyVehicles.amount,
            createdAt: verifyVehicles.createdAt,
            km: verifyVehicles.km,
            lightParking: verifyVehicles.lightParking,
            lightLow: verifyVehicles.lightLow,
            lightHigh: verifyVehicles.lightHigh,
            lightReverse: verifyVehicles.lightReverse,
            lightTravel: verifyVehicles.lightTravel,
            equipmentFlasher: verifyVehicles.equipmentFlasher,
            equipmentHooter: verifyVehicles.equipmentHooter,
            equipmentMailbox: verifyVehicles.equipmentMailbox,
            equipmentGlass: verifyVehicles.equipmentGlass,
            equipmentPI: verifyVehicles.equipmentPI,
            brakeHand: verifyVehicles.brakeHand,
            brakeFoot: verifyVehicles.brakeFoot,
            brakeOther: verifyVehicles.brakeOther,
            communicationGPS: verifyVehicles.communicationGPS,
            communicationGSM: verifyVehicles.communicationGSM,
            communicationContingency: verifyVehicles.communicationContingency,
            tireFR: verifyVehicles.tireFR,
            tireFL: verifyVehicles.tireFL,
            tireBR: verifyVehicles.tireBR,
            tireBL: verifyVehicles.tireBL,
            tireReplace: verifyVehicles.tireReplace,
            contingenciesMask: verifyVehicles.contingenciesMask,
            contingenciesOxigen: verifyVehicles.contingenciesOxigen,
            contingenciesTriangles: verifyVehicles.contingenciesTriangles,
            contingenciesKit: verifyVehicles.contingenciesKit,
            contingenciesExtinguisher1: verifyVehicles.contingenciesExtinguisher1,
            contingenciesExtinguisher2: verifyVehicles.contingenciesExtinguisher2,
            daHydraulicjack: verifyVehicles.daHydraulicjack,
            daWheelwrench: verifyVehicles.daWheelwrench,
            daSeatbelt: verifyVehicles.daSeatbelt,
            daMirrors: verifyVehicles.daMirrors,
            daBhorn: verifyVehicles.daBhorn,
            daLocks: verifyVehicles.daLocks,
            bulletproofdriver: verifyVehicles.bulletproofdriver,
            bulletproofP1: verifyVehicles.bulletproofP1,
            bulletproofP2: verifyVehicles.bulletproofP2,
            bulletproofG1: verifyVehicles.bulletproofG1,
            bulletproofG2: verifyVehicles.bulletproofG2,
            fuel: verifyVehicles.fuel,
            observations: verifyVehicles.observations,
            driver: `${user.first_name} ${user.last_name}`,
            driverLicense: driver.license,
            guard: `${guard.first_name} ${guard.last_name}`,
            vehicleModel: vehicle.model,
            vehiclePlate: vehicle.plate,
        };

        res.json(data);

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
            vehicleId,
            driverId,
            guardId,
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
            vehicleId,
            driverId,
            guardId,
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
            vehicleId,
            driverId,
            guardId,
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
        verifyVehicle.vehicleId = vehicleId
        verifyVehicle.driverId = driverId
        verifyVehicle.guardId = guardId
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
        await VerifyVehicle.save()
        return res.sendStatus(204)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: [error] })
    }
}

//get verifyVehicle by vehicle id
export const getVerifyVehicleByVehicleId = async (req, res) => {
    try {
        const { id } = req.params;
        const verifyVehicles = await VerifyVehicle.findOne({
            where: { vehicleId: id },
            include: [
                { model: User },
                { model: Driver },
                { model: Vehicle }],
                raw: true,
        });

        const driverId = verifyVehicles.driverId
        const guardId = verifyVehicles.guardId
        const vehicleId = verifyVehicles.vehicleId

        // Buscar el conductor por el ID
        const driver = await Driver.findOne({
            where: { id: driverId }
        });

        // Obtener el userId del conductor
        const userId = driver.userId;

        // Buscar al usuario/driver por su ID
        const user = await User.findOne({
            where: { id: userId }
        });

        // Buscar guardia por ID
        const guard = await User.findOne({
            where: { id: guardId }
        });

        // Buscar vehiculo por ID
        const vehicle = await Vehicle.findOne({
            where: { id: vehicleId }
        });

        // Formatear los resultados antes de enviarlos
        const data = {
            id: verifyVehicles.id,
            nInvoce: verifyVehicles.nInvoce,
            detail: verifyVehicles.detail,
            amount: verifyVehicles.amount,
            createdAt: verifyVehicles.createdAt,
            km: verifyVehicles.km,
            lightParking: verifyVehicles.lightParking,
            lightLow: verifyVehicles.lightLow,
            lightHigh: verifyVehicles.lightHigh,
            lightReverse: verifyVehicles.lightReverse,
            lightTravel: verifyVehicles.lightTravel,
            equipmentFlasher: verifyVehicles.equipmentFlasher,
            equipmentHooter: verifyVehicles.equipmentHooter,
            equipmentMailbox: verifyVehicles.equipmentMailbox,
            equipmentGlass: verifyVehicles.equipmentGlass,
            equipmentPI: verifyVehicles.equipmentPI,
            brakeHand: verifyVehicles.brakeHand,
            brakeFoot: verifyVehicles.brakeFoot,
            brakeOther: verifyVehicles.brakeOther,
            communicationGPS: verifyVehicles.communicationGPS,
            communicationGSM: verifyVehicles.communicationGSM,
            communicationContingency: verifyVehicles.communicationContingency,
            tireFR: verifyVehicles.tireFR,
            tireFL: verifyVehicles.tireFL,
            tireBR: verifyVehicles.tireBR,
            tireBL: verifyVehicles.tireBL,
            tireReplace: verifyVehicles.tireReplace,
            contingenciesMask: verifyVehicles.contingenciesMask,
            contingenciesOxigen: verifyVehicles.contingenciesOxigen,
            contingenciesTriangles: verifyVehicles.contingenciesTriangles,
            contingenciesKit: verifyVehicles.contingenciesKit,
            contingenciesExtinguisher1: verifyVehicles.contingenciesExtinguisher1,
            contingenciesExtinguisher2: verifyVehicles.contingenciesExtinguisher2,
            daHydraulicjack: verifyVehicles.daHydraulicjack,
            daWheelwrench: verifyVehicles.daWheelwrench,
            daSeatbelt: verifyVehicles.daSeatbelt,
            daMirrors: verifyVehicles.daMirrors,
            daBhorn: verifyVehicles.daBhorn,
            daLocks: verifyVehicles.daLocks,
            bulletproofdriver: verifyVehicles.bulletproofdriver,
            bulletproofP1: verifyVehicles.bulletproofP1,
            bulletproofP2: verifyVehicles.bulletproofP2,
            bulletproofG1: verifyVehicles.bulletproofG1,
            bulletproofG2: verifyVehicles.bulletproofG2,
            fuel: verifyVehicles.fuel,
            observations: verifyVehicles.observations,
            driver: `${user.first_name} ${user.last_name}`,
            driverLicense: driver.license,
            guard: `${guard.first_name} ${guard.last_name}`,
            vehicleModel: vehicle.model,
            vehiclePlate: vehicle.plate,
        };

        res.json(data);

    } catch (error) {
        res.status(500).json({
            errors: [error.message],
        });
    }
}

//get verifyVehicle by driver id
export const getVerifyVehicleByDriverId = async (req, res) => {
    try {
        const { id } = req.params;
        const verifyVehicles = await VerifyVehicle.findOne({
            where: { driverId: id },
            include: [
                { model: User },
                { model: Driver },
                { model: Vehicle }],
                raw: true,
        });

        const driverId = verifyVehicles.driverId
        const guardId = verifyVehicles.guardId
        const vehicleId = verifyVehicles.vehicleId

        // Buscar el conductor por el ID
        const driver = await Driver.findOne({
            where: { id: driverId }
        });

        // Obtener el userId del conductor
        const userId = driver.userId;

        // Buscar al usuario/driver por su ID
        const user = await User.findOne({
            where: { id: userId }
        });

        // Buscar guardia por ID
        const guard = await User.findOne({
            where: { id: guardId }
        });

        // Buscar vehiculo por ID
        const vehicle = await Vehicle.findOne({
            where: { id: vehicleId }
        });

        // Formatear los resultados antes de enviarlos
        const data = {
            id: verifyVehicles.id,
            nInvoce: verifyVehicles.nInvoce,
            detail: verifyVehicles.detail,
            amount: verifyVehicles.amount,
            createdAt: verifyVehicles.createdAt,
            km: verifyVehicles.km,
            lightParking: verifyVehicles.lightParking,
            lightLow: verifyVehicles.lightLow,
            lightHigh: verifyVehicles.lightHigh,
            lightReverse: verifyVehicles.lightReverse,
            lightTravel: verifyVehicles.lightTravel,
            equipmentFlasher: verifyVehicles.equipmentFlasher,
            equipmentHooter: verifyVehicles.equipmentHooter,
            equipmentMailbox: verifyVehicles.equipmentMailbox,
            equipmentGlass: verifyVehicles.equipmentGlass,
            equipmentPI: verifyVehicles.equipmentPI,
            brakeHand: verifyVehicles.brakeHand,
            brakeFoot: verifyVehicles.brakeFoot,
            brakeOther: verifyVehicles.brakeOther,
            communicationGPS: verifyVehicles.communicationGPS,
            communicationGSM: verifyVehicles.communicationGSM,
            communicationContingency: verifyVehicles.communicationContingency,
            tireFR: verifyVehicles.tireFR,
            tireFL: verifyVehicles.tireFL,
            tireBR: verifyVehicles.tireBR,
            tireBL: verifyVehicles.tireBL,
            tireReplace: verifyVehicles.tireReplace,
            contingenciesMask: verifyVehicles.contingenciesMask,
            contingenciesOxigen: verifyVehicles.contingenciesOxigen,
            contingenciesTriangles: verifyVehicles.contingenciesTriangles,
            contingenciesKit: verifyVehicles.contingenciesKit,
            contingenciesExtinguisher1: verifyVehicles.contingenciesExtinguisher1,
            contingenciesExtinguisher2: verifyVehicles.contingenciesExtinguisher2,
            daHydraulicjack: verifyVehicles.daHydraulicjack,
            daWheelwrench: verifyVehicles.daWheelwrench,
            daSeatbelt: verifyVehicles.daSeatbelt,
            daMirrors: verifyVehicles.daMirrors,
            daBhorn: verifyVehicles.daBhorn,
            daLocks: verifyVehicles.daLocks,
            bulletproofdriver: verifyVehicles.bulletproofdriver,
            bulletproofP1: verifyVehicles.bulletproofP1,
            bulletproofP2: verifyVehicles.bulletproofP2,
            bulletproofG1: verifyVehicles.bulletproofG1,
            bulletproofG2: verifyVehicles.bulletproofG2,
            fuel: verifyVehicles.fuel,
            observations: verifyVehicles.observations,
            driver: `${user.first_name} ${user.last_name}`,
            driverLicense: driver.license,
            guard: `${guard.first_name} ${guard.last_name}`,
            vehicleModel: vehicle.model,
            vehiclePlate: vehicle.plate,
        };

        res.json(data);

    } catch (error) {
        res.status(500).json({
            errors: [error.message],
        });
    }
}

//get verifyVehicle by guard id
export const getVerifyVehicleByGuardId = async (req, res) => {
    try {
        const { id } = req.params;
        const verifyVehicles = await VerifyVehicle.findOne({
            where: { guardId: id },
            include: [
                { model: User },
                { model: Driver },
                { model: Vehicle }],
                raw: true,
        });

        const driverId = verifyVehicles.driverId
        const guardId = verifyVehicles.guardId
        const vehicleId = verifyVehicles.vehicleId

        // Buscar el conductor por el ID
        const driver = await Driver.findOne({
            where: { id: driverId }
        });

        // Obtener el userId del conductor
        const userId = driver.userId;

        // Buscar al usuario/driver por su ID
        const user = await User.findOne({
            where: { id: userId }
        });

        // Buscar guardia por ID
        const guard = await User.findOne({
            where: { id: guardId }
        });

        // Buscar vehiculo por ID
        const vehicle = await Vehicle.findOne({
            where: { id: vehicleId }
        });

        // Formatear los resultados antes de enviarlos
        const data = {
            id: verifyVehicles.id,
            nInvoce: verifyVehicles.nInvoce,
            detail: verifyVehicles.detail,
            amount: verifyVehicles.amount,
            createdAt: verifyVehicles.createdAt,
            km: verifyVehicles.km,
            lightParking: verifyVehicles.lightParking,
            lightLow: verifyVehicles.lightLow,
            lightHigh: verifyVehicles.lightHigh,
            lightReverse: verifyVehicles.lightReverse,
            lightTravel: verifyVehicles.lightTravel,
            equipmentFlasher: verifyVehicles.equipmentFlasher,
            equipmentHooter: verifyVehicles.equipmentHooter,
            equipmentMailbox: verifyVehicles.equipmentMailbox,
            equipmentGlass: verifyVehicles.equipmentGlass,
            equipmentPI: verifyVehicles.equipmentPI,
            brakeHand: verifyVehicles.brakeHand,
            brakeFoot: verifyVehicles.brakeFoot,
            brakeOther: verifyVehicles.brakeOther,
            communicationGPS: verifyVehicles.communicationGPS,
            communicationGSM: verifyVehicles.communicationGSM,
            communicationContingency: verifyVehicles.communicationContingency,
            tireFR: verifyVehicles.tireFR,
            tireFL: verifyVehicles.tireFL,
            tireBR: verifyVehicles.tireBR,
            tireBL: verifyVehicles.tireBL,
            tireReplace: verifyVehicles.tireReplace,
            contingenciesMask: verifyVehicles.contingenciesMask,
            contingenciesOxigen: verifyVehicles.contingenciesOxigen,
            contingenciesTriangles: verifyVehicles.contingenciesTriangles,
            contingenciesKit: verifyVehicles.contingenciesKit,
            contingenciesExtinguisher1: verifyVehicles.contingenciesExtinguisher1,
            contingenciesExtinguisher2: verifyVehicles.contingenciesExtinguisher2,
            daHydraulicjack: verifyVehicles.daHydraulicjack,
            daWheelwrench: verifyVehicles.daWheelwrench,
            daSeatbelt: verifyVehicles.daSeatbelt,
            daMirrors: verifyVehicles.daMirrors,
            daBhorn: verifyVehicles.daBhorn,
            daLocks: verifyVehicles.daLocks,
            bulletproofdriver: verifyVehicles.bulletproofdriver,
            bulletproofP1: verifyVehicles.bulletproofP1,
            bulletproofP2: verifyVehicles.bulletproofP2,
            bulletproofG1: verifyVehicles.bulletproofG1,
            bulletproofG2: verifyVehicles.bulletproofG2,
            fuel: verifyVehicles.fuel,
            observations: verifyVehicles.observations,
            driver: `${user.first_name} ${user.last_name}`,
            driverLicense: driver.license,
            guard: `${guard.first_name} ${guard.last_name}`,
            vehicleModel: vehicle.model,
            vehiclePlate: vehicle.plate,
        };

        res.json(data);

    } catch (error) {
        res.status(500).json({
            errors: [error.message],
        });
    }
}
