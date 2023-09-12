import app from "./app.js";
import { sequelize } from "./db.js";
import "./models/Bag.js";
import "./models/Fueling.js";
import "./models/Incident.js";
import "./models/Maintenance.js";
import "./models/Paf.js";
import "./models/Remesa.js";
import "./models/Route.js";
import "./models/User.js";
import "./models/Vehicle.js";
import "./models/VerifyVehicle.js";

async function main() {
  try {
    await sequelize.sync();
    console.log("Connection established");
    app.listen(app.get("port"));
    console.log("Server listening on port " + app.get("port"));
  } catch (error) {
    console.log("Error: " + error);
  }
}

main();
