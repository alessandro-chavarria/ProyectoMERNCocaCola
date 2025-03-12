// Importo todo lo de la libreria express
import express from "express";
import productsRoutes from "./src/routes/products.js";
import clientsRoutes from "./src/routes/clients.js";
import branchesRoutes from "./src/routes/branches.js";
import employeesRoutes from "./src/routes/employees.js";

//Creo una constante que es igual a la libreria que importe y la ejecuta
const app = express();
app.use (express.json());

//Definir la ruta
app.use("/api/products", productsRoutes);
app.use("/api/clients", clientsRoutes);
app.use("/api/branches", branchesRoutes);
app.use("/api/employees", employeesRoutes);

//Exporto la constante para poder usar el express en otros lados 
export default app;