import express from "express";
import registerEmployeeControllers from "../controllers/registerEmployeeControllers.js";

const router = express.Router();

router.route("/")
.post(registerEmployeeControllers.register);

export default router;