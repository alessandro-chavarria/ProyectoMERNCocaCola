//Como vamos a validar si es cliente o empleado, entonces importo ambos modelos
import clientModels from "../models/Clients.js";
import employeeModels from "../models/Employees.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

const loginController = {};

loginController.login = async (req, res) =>{
    const {email, password} = req.body;

    try{
        //Validamos los 3 posibles niveles
        // 1. Admin, 2. Empleado, 3. Cliente
        let userFound; //Variable que dice si encontramos un usuario
        let userType; //Variable que dice que tipo de usuario es

        //1. Admin
        if(email === config.emailAdmin.email && password === config.emailAdmin.password){
            userType = "Admin";
            userFound = {_id: "Admin"};
        } else{
                //2. Empleado
                userFound = await employeeModels.findOne({email});;
                userType = "Employee";

                //3. Cliente
                if(!userFound){
                    userFound = await clientModels.findOne({email});
                    userType = "Client";''
                }
        }

        //Si no encontramos ningun usuario
        if(!userFound){
            return res.json({message: "User not found"});
        }

        //Si no es administrador validamos la contraseña
        if(userType !== "Admin"){
            const isMatch = bcrypt.compare(password, userFound.password);
            if(!isMatch){
                return res.json({message: "Invalid password"});
            }
        }

        //Generar el token
        jsonwebtoken.sign(
            //1- Que voy a guardar
            {id: userFound._id, userType},
            //2- Clave secreta
            config.JWT.secret,
            //3- Cuando expira
            {expiresIn: config.JWT.expiresIn},
            //4- Funcion flecha
            (error, token) =>{
                if(error) console.log(error);
                
                res.cookie("authToken", error);
                res.json({message: "login succesful"})
            }
        )

        //1. Admin
        //Verifiquemos si quien esta ingresando es Admin
    }catch(error){
        console.log(error)
    }
}

export default loginController;