// Importo todo lo de la libreria express
import express from "express";
import cookieParser from "cookie-parser";
import productsRoutes from "./src/routes/products.js";
import clientsRoutes from "./src/routes/clients.js";
import branchesRoutes from "./src/routes/branches.js";
import employeesRoutes from "./src/routes/employees.js";
import reviewsRoutes from "./src/routes/reviews.js";
import evaluationsRoutes from "./src/routes/evaluations.js";
import registerEmployeeRoutes from "./src/routes/registerEmployee.js";
import loginRoutes from "./src/routes/login.js";
import logoutRoutes from "./src/routes/logout.js";

//Creo una constante que es igual a la libreria que importe y la ejecuta
const app = express();
app.use (express.json());
app.use(cookieParser());

//Definir la ruta
app.use("/api/products", productsRoutes);
app.use("/api/clients", clientsRoutes);
app.use("/api/branches", branchesRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/evaluations", evaluationsRoutes);

app.use("/api/registerEmployee", registerEmployeeRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/logout", logoutRoutes);

//Exporto la constante para poder usar el express en otros lados 
export default app;