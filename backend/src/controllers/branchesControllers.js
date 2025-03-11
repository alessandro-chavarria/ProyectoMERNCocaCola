const branchesControllers ={};
import branchesmodel from "../models/Branches.js";

//SELECT
branchesControllers.getBranches = async (req, res) => {
    const branches = await branchesmodel.find()
    res.json(branches)
}

//INSERT
branchesControllers.insertBranches = async (req, res) => {
    const {name, address, telephone, schedule} = req.body;
    const newBranches = new branchesmodel ({name, address, telephone, schedule});
    await newBranches.save()
    res.json({message: "branches saved"});
}

//DELETE
branchesControllers.deleteBranches = async (req, res) => {
    await branchesmodel.findByIdAndDelete(req.params.id);
    res.json({message: "branches deleted"});
}

//UPDATE
branchesControllers.updateBranches = async (req, res) => {
    const {name, address, telephone, schedule} = req.body;
    const updateBranches = await branchesmodel.findByIdAndUpdate(req.params.id, {name, address, telephone, schedule})
    res.json({message: "branches updated"});
}

export default branchesControllers;