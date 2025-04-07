import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";
import clientModels from "../models/Clients.js";
import { config } from "../config.js";
import { info } from "console";

//Creamos un array de funciones 
const registerClientControllers = {};

registerClientControllers.register = async (req, res) =>{
    //1- Solicitar las cosas que vamos a guardar
    const {name, lastName, birthday, email, password, telephone, dui, isVerified} = req.body;

    try {
        const existClient = await clientModels.findOne({email})
        if(existClient){
            return res.json({message: "Client already exist"})
        }

        //2- Encriptar la contraseña
        const passwordHash = await bcrypt.hash(password, 10)

        //3- Guardar cliente en la base de datos
        const newClient = new clientModels({name, lastName, birthday, email, password: passwordHash, telephone, dui: dui || null, isVerified: isVerified || false});

        await newClient.save();

        //Generamos un codigo aleatorio
        const verificationCode = crypto.randomBytes(3).toString("hex")

        //Crear el token
        const tokenCode = jsonwebtoken.sign(
            //1- ¿Que vamos a guardar?
            (email, verificationCode), 
            //2- Palabra secreta
            config.JWT.secret,
            //3- Cuando expira
            {expiresIn: "2h"}
        )

        res.cookie("VerificationToken", tokenCode, {maxAge: 2*60*60*1000})

        //Enviar el correo electronico
        //1- Transporter => Quien lo envia 
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.email_user, 
                pass: config.email.email_pass
            }
        });

        //2- MailOptions => Quien lo recibe
        const MailOptions = {
            //¿Quien lo envia?
            from: config.email.email_user,
            //¿Quien lo recibe?
            to: email,
            //Asunto
            subject: "Verificación de correo",
            //Cuerpo del correo electronico
            text: `Para verificar tu correo, utiliza el siguiente código ${verificationCode}\n El código vence en dos horas`
        }

        //3- Enviar correo
        transporter.sendMail(MailOptions, (error, info) =>{
            if(error) return res.json({message: "Error"})

            console.log("Correo enviado" + info.response)
        })

        res.json({message: "Client registered. Please verify your email whit the code send"})

    } catch (error) {
        res.json({message: "Error" + error})
    }
};

//Verificar el codigo
registerClientControllers.verifyCodeEmail = async (req, res) =>{
    const {verificationCode} = req.body;

    //Obtengo el token que contiene el codigo de verificacion
    const token = req.cookies.VerificationToken

    try{
        //Verificar y decodificar el token
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)
        const {email, verificationCode: storedCode} = decoded;

        //Comparar el codigo que enviamos al correo con el que el usario escribe
        if(verificationCode !== storedCode){
            return res.json({message: "Invalid code"})
        }

        //Cambiamos el estado de "isVerified" a true
        const client = await clientModels.findOne({email});
        client.isVerified = true;
        await client.save();

        res.json({message: "Email verified sucessfull"});

        //Quito la cookie con el token
        res.clearCookie("VerificationToken");
    } catch (error) {
        res.json({message: "Error"});
    }
};

export default registerClientControllers;