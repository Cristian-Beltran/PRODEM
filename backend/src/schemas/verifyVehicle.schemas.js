import { z } from "zod";

export const VerifyVehicleSchema = z.object({
    km: z.number({
        required_error: "Se requiere el kilometraje",
    }),
    lightParking: z.string({
        required_error: "Se requiere la luz de parqueo",
    }),
    lightLow: z.string({
        required_error: "Se requiere la luz baja",
    }),
    lightHigh: z.string({
        required_error: "Se requiere la luz alta",
    }),
    lightReverse: z.string({
        required_error: "Se requiere la luz de reversa",
    }),
    lightTravel: z.string({
        required_error: "Se requiere la luz de viaje",
    }),
    equipmentFlasher: z.string({
        required_error: "Se requiere el equipo intermintente",
    }),
    equipmentHooter: z.string({
        required_error: "Se requiere bocina de equipo",
    }),
    equipmentMailbox: z.string({
        required_error: "Se requiere el buzon de equipamiento",
    }),
    equipmentGlass: z.string({
        required_error: "Se requiere el equipamiento de vidrio",
    }),
    equipmentPI: z.string({
        required_error: "Se requiere el equipamiento de PI",
    }),
    brakeHand: z.string({
        required_error: "Se requiere el freno de mano",
    }),
    brakeFoot: z.string({
        required_error: "Se requiere el freno de pie",
    }),
    brakeOther: z.string({
        required_error: "Se requiere el freno extra",
    }),
    communicationGPS: z.string({
        required_error: "Se requiere la comunicacion GPS",
    }),
    communicationGSM: z.string({
        required_error: "Se requiere la comunicacion GSM",
    }),
    communicationContingency: z.string({
        required_error: "Se requiere la comunicacion de contingencia",
    }),
    tireFR: z.string({
        required_error: "Se requiere el neumático frontal derecho",
    }),
    tireFL: z.string({
        required_error: "Se requiere el neumático frontal izquierdo",
    }),
    tireBR: z.string({
        required_error: "Se requiere el neumático trasero derecho",
    }),
    tireBL: z.string({
        required_error: "Se requiere el neumático trasero izquierdo",
    }),
    tireReplace: z.string({
        required_error: "Se requiere el neumático de reemplazo",
    }),
    contingenciesMask: z.string({
        required_error: "Se requiere la máscara de contingencia",
    }),
    contingenciesOxigen: z.string({
        required_error: "Se requiere el oxígeno de contingencia",
    }),
    contingenciesTriangles: z.string({
        required_error: "Se requiere el triángulo de contingencia",
    }),
    contingenciesKit: z.string({
        required_error: "Se requiere el kit de contingencia",
    }),
    contingenciesExtinguisher1: z.string({
        required_error: "Se requiere el primer extintor de contingencia",
    }),
    contingenciesExtinguisher2: z.string({
        required_error: "Se requiere el segundo extintor de contingencia",
    }),
    daHydraulicjack: z.string({
        required_error: "Se requiere el gato hidráulico",
    }),
    daWheelwrench: z.string({
        required_error: "Se requiere la llave de rueda",
    }),
    daSeatbelt: z.string({
        required_error: "Se requiere el cinturón de seguridad",
    }),
    daMirrors: z.string({
        required_error: "Se requiere el espejo",
    }),

    // TODO: Revisar si la traduccion es correcta Bhorn:
    daBhorn: z.string({
        required_error: "Se requiere el parachoques",
    }),
    daLocks: z.string({
        required_error: "Se requiere la cerradura de las puertas",
    }),

    // TODO: Revisar si la traduccion es correcta de bulletproof y a que pertenece especificamente:
    bulletproofdriver: z.string({
        required_error: "Se requiere la ventanilla a prueba de balas del conductor",
    }),
    bulletproofP1: z.string({
        required_error: "Se requiere la ventanilla a prueba de balas del primer pasajero",
    }),
    bulletproofP2: z.string({
        required_error: "Se requiere la ventanilla a prueba de balas del segundo pasajero",
    }),
    bulletproofG1: z.string({
        required_error: "Se requiere la ventanilla a prueba de balas del primer guardia",
    }),
    bulletproofG2: z.string({
        required_error: "Se requiere la ventanilla a prueba de balas del segundo guardia",
    }),
    fuel: z.string({
        required_error: "Se requiere la particion de combustible",
    }),
    observations: z.string(),
})