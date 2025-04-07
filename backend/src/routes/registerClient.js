import express from "express";
import registerClientControllers from "../controllers/registerClientControllers.js";

const router = express.Router();

router.route("/").post(registerClientControllers.register);
router.route("/verifyCodeEmail").post(registerClientControllers.verifyCodeEmail);

export default router;