//Importamos el modelo de la base de datos
import employeeModels  from "../models/Employees.js";
import bcryptjs from "bcryptjs";  //Libreria para encriptar
import jsonwebtoken from "jsonwebtoken"; //Libreria para token
import { config } from "../config.js";

//Creamos un array de funciones
const registerEmployeeControllers = {};

registerEmployeeControllers.register = async (req, res) => {
    //Pedimos todos los datos
    const{name, lastName, birthday, email, addressm, hireDate, password, telephone, dui, isssNumber, isVerified} = req.body;

    try{
        //Verificamos si el Empleado ya existe
        const existEmployee = await employeeModels.findOne({email})
        if(existEmployee){
        return res.json({message: "Employee already exist"});
        }

        //Hashear o encriptar la contraseña
        const passwordHash = await bcryptjs.hash(password, 10);

        //Guardamos el Empleado en la Base de Datos
        const newEmployee = new employeeModels({name, lastName, birthday, email, addressm, hireDate, password: passwordHash, telephone, dui, isssNumber, isVerified});

        await newEmployee.save();

        //Generar un token que valide que ya estoy registrado y puedo acceder a todas las paginas
        jsonwebtoken.sign(
            //1- Que voy a guardar
            {id: newEmployee._id},
            //2- Clave secreta
            config.JWT.secret,
            //3- Cuando expira
            {expiresIn: config.JWT.expiresIn},
            //4- Funcion flecha 
            (error, token) => {
                if(error) console.log(error);
                res.cookie("authToken", token);
                res.json({message: "Empleado Registrado"})
            }
        );
    } catch(error){
        console.log(error);
        res.json({message: "Error al registrar un usuario"});
    }
};

export default registerEmployeeControllers;