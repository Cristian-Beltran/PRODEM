import { TypeMaintenances, Maintenances } from "../models/Maintenance.js";
import { User, Driver } from "../models/User.js";
import { Vehicle } from "../models/Vehicle.js"

//get maintenances
export const getMaintenances = async (req, res) => {
    try {
        const maintenances = await Maintenances.findAll({
            include: [{ model: User }, { model: Driver }, { model: TypeMaintenances }, { model: Vehicle }],
            attributes: [
                "id",
                "nInvoce",
                "detail",
                "amount",
                "createdAt",
            ],
            order: ["createdAt", "DESC"],
        });

        const guardUser = await User.findOne({
            where: { Type: "guard" },
            attributes: ["first_name", "last_name"],
        });

        const formattedMaintenances = maintenances.map((maintenance) => ({
            id: maintenance.id,
            nInvoce: maintenance.nInvoce,
            detail: maintenance.detail,
            amount: maintenance.amount,
            createdAt: maintenance.createdAt,
            guardName: guardUser ? `${guardUser.first_name} ${guardUser.last_name}` : null,
            driverName: maintenance.Driver ? `${maintenance.Driver.user.first_name} ${maintenance.Driver.user.last_name}` : null,
            vehicleModel: maintenance.vehicle.model,
            vehiclePlate: maintenance.vehicle.plate,
            typeMaintenanceName: maintenance.TypeMaintenance ? maintenance.TypeMaintenance.name : null,
            typeMaintenanceDetail: maintenance.TypeMaintenance ? maintenance.TypeMaintenance.detail : null,
        }));

        res.json(formattedMaintenances);
    } catch (error) {
        res.status(500).json({
            errors: [error.message],
        });
    }
};

//get maintenance by id
export const getMaintenance = async (req, res) => {
    try {
        const { id } = req.params;
        const maintenances = await Maintenances.findOne({
            where: { id },
            include: [{ model: User }, { model: Driver }, { model: TypeMaintenances }, { model: Vehicle }],
            attributes: [
                "id",
                "nInvoce",
                "detail",
                "amount",
                "typeMaintenanceId",
                "vehicleId",
                "createdAt",
            ]
        });

        const guardUser = await User.findOne({
            where: { Type: "guard" },
            attributes: ["first_name", "last_name"],
        });

        const formattedMaintenances = maintenances.map((maintenance) => ({
            id: maintenance.id,
            nInvoce: maintenance.nInvoce,
            detail: maintenance.detail,
            amount: maintenance.amount,
            typeMaintenanceId: maintenance.typeMaintenanceId,
            vehicleId: maintenance.vehicleId,
            createdAt: maintenance.createdAt,
            guardName: guardUser ? `${guardUser.first_name} ${guardUser.last_name}` : null,
            driverName: maintenance.Driver ? `${maintenance.Driver.user.first_name} ${maintenance.Driver.user.last_name}` : null,
            vehicleModel: maintenance.vehicle.model,
            vehiclePlate: maintenance.vehicle.plate,
            typeMaintenanceName: maintenance.TypeMaintenance ? maintenance.TypeMaintenance.name : null,
            typeMaintenanceDetail: maintenance.TypeMaintenance ? maintenance.TypeMaintenance.detail : null,
        }));
        res.json(formattedMaintenances);
    } catch (error) {
        res.status(500).json({
            errors: [error.message],
        });
    }
};

//create maintenance
export const createMaintenance = async (req, res) => {
    try {
        const { nInvoce, detail, amount, typeMaintenanceId, guardId, driverId, vehicleId } =
            req.body;
        await Maintenances.create({
            nInvoce,
            detail,
            amount,
            typeMaintenanceId,
            guardId,
            driverId,
            vehicleId,
        });
        return res.sendStatus(204);
    } catch (error) {
        res.status(500).json({
            errors: [error.message],
        });
    }
};

//update maintenance
export const updateMaintenance = async (req, res) => {
    try {
        const { id } = req.params;
        const { nInvoce, detail, amount, typeMaintenanceId, guardId, driverId, vehicleId } = req.body;
        const maintenance = await Maintenances.findPk(id)
        maintenance.nInvoce = nInvoce
        maintenance.detail = detail
        maintenance.amount = amount
        maintenance.typeMaintenanceId = typeMaintenanceId
        maintenance.guardId = guardId
        maintenance.driverId = driverId
        maintenance.vehicleId = vehicleId
        await maintenance.save()
        return res.sendStatus(204)
    } catch (error) {
        res.status(500).json({
            errors: [error.message],
        });
    }
};