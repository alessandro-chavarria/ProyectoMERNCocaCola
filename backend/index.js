//Vamos a importa el archivo app.js
import app from "./app.js";
import "./database.js";
import { config } from "./src/config.js";

//Creo una funcion que se encarga de ejecutar el servidor 
async function main() {
    app.listen(config.server.port);
    console.log("Server is running");
}

//Ejecutamos todo
main();