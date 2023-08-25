import app from "./app.js";
import { sequelize } from "./db.js";
//import "./models/User.js";
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
