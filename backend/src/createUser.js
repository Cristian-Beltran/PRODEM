import { User } from "./models/User.js";
import readline from "readline";
import bcrypt from "bcryptjs";
import validator from "email-validator";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const userData = {};

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function askForData() {
  console.log("Creando usuario administrador");
  while (!userData.username) {
    userData.username = await askQuestion("Ingresa tu nombre de usuario: ");
  }

  while (!userData.first_name) {
    userData.first_name = await askQuestion("Ingresa tu nombre/s: ");
  }

  while (!userData.last_name) {
    userData.last_name = await askQuestion("Ingresa tus apellidos: ");
  }

  while (!userData.email || !validator.validate(userData.email)) {
    if (userData.email) {
      console.log("Ingresa un email válido.");
    }
    userData.email = await askQuestion("Ingresa tu email: ");
  }

  while (!userData.password || userData.password.length <= 6) {
    if (userData.password) {
      console.log("Ingresa una contraseña valida.");
    }
    userData.password = await askQuestion(
      "Ingresa tu contraseña (debe ser mayor a 6 caracteres): "
    );
  }

  const passwordHash = await bcrypt.hash(userData.password, 10); // hashaleatorio

  const [user, created] = await User.findOrCreate({
    where: { email: userData.email },
    defaults: {
      username: userData.username,
      first_name: userData.first_name,
      last_name: userData.last_name,
      password: passwordHash,
      type: "administrador",
      status: true,
    },
  });

  if (!created) console.log("El usuario ya ha sido creado anteriormente");
  console.log("Datos de usuario");
  console.log("Nombre de usuario:", user.username);
  console.log("Nombre/s:", user.first_name);
  console.log("Apellidos:", user.last_name);
  console.log("Email:", user.email);
  rl.close();
}

askForData();
