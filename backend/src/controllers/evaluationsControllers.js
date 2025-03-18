const evaluationsControllers = {};
import { populate } from "dotenv";
import evaluationsModel from "../models/Evaluations.js"

//SELECT UPDATE
evaluationsControllers.getEvaluations = async (req, res) =>{
    const evaluations = await evaluationsModel.find().populate("idEmployees");
    res.json(evaluations)
}

//INSERT
evaluationsControllers.insertEvaluations = async (req, res) =>{
    const {comment, grade, role, idEmployees} = req.body;
    const newEvaluations = new evaluationsModel({comment, grade, role, idEmployees})
    await newEvaluations.save()
    res.json({message: "evaluation saved"})
}

//DELETE
evaluationsControllers.deleteEvaluations = async (req, res) => {
    await evaluationsModel.findByIdAndDelete(req.params.id);
    res.json({message: "evaluation deleted"});
}

//UPDATE
evaluationsControllers.updateEvaluations = async (req, res) => {
    const {comment, grade, role, idEmployees} = req.body;
    const updatedEvaluations = await evaluationsModel.findByIdAndUpdate(req.params.id, {comment, grade, role, idEmployees}, {new: true})
    res.json({message: "evaluation updated"});
}

export default evaluationsControllers;