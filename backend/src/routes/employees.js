import express from "express";
import employeesController from "../controllers/employeesControllers.js";

const router = express.Router();

router.route("/")
.get(employeesController.getEmployees)
.post(employeesController.insertEmployees)

router.route("/:id")
.put(employeesController.updateEmployees)
.delete(employeesController.deleteEmployees);

export default router;