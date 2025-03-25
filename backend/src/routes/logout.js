import express from "express";
import logoutControllers from "../controllers/logoutControllers.js";

const router = express.Router();

router.route("/")
.post(logoutControllers.logout);

export default router;