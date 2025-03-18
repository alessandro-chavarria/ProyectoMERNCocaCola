import express from "express";
import evaluationsControllers from "../controllers/evaluationsControllers.js"

const router = express.Router();

router.route("/")
.get(evaluationsControllers.getEvaluations)
.post(evaluationsControllers.insertEvaluations)

router.route("/:id")
.put(evaluationsControllers.updateEvaluations)
.delete(evaluationsControllers.deleteEvaluations);

export default router