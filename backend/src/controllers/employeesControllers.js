const employeesController = {};
import employeesModels from "../models/Employees.js";

//SELECT
employeesController.getEmployees = async (req, res) => {
    const employees = await productsModel.find()
    res.json(products)
}

//INSERT
employeesController.insertEmployees = async (req, res) => {
    const {name, Lastname,  birthday, email, address, hireDate, password, telephone, dui, isssNumber, isVerified} = req.body;
    const newProducts = new productsModel({name, Lastname,  birthday, email, address, hireDate, password, telephone, dui, isssNumber, isVerified})
    await newEmployees.save()
    res.json({message: "employee saved"});
}

//DELETE
employeesController.deleteEmployees = async (req, res) => {
    await employeesModels.findByIdAndDelete(req.params.id);
    res.json({message: "employee deleted"});
}

//UPDATE
employeesController.updateEmployees = async (req, res) => {
    const {name, description, price, stock} = req.body;
    const updateEmployees = await employeesModels.findByIdAndUpdate(req.params.id, {name, description, price, stock}, {new: true})
    res.json({message: "employees updated"});
}

export default employeesController;