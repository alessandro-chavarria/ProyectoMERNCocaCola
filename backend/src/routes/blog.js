import express from "express";
import multer from "multer";
import blogController from "../controllers/blogControllers.js";

const router = express.Router();

//Configurar una carpeta en local que guarde las imagenes
const upload = multer({dest: "public/"})

router.route("/")
.get(blogController.getAllPosts)
.post(upload.single("image"), blogController.createPost);

export default router;