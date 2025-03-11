import express from "express";
import branchesControllers from "../controllers/branchesControllers.js";

const router = express.Router();

router.route("/")
.get(branchesControllers.getBranches)
.post(branchesControllers.insertBranches)

router.route("/:id")
.put(branchesControllers.updateBranches)
.delete(branchesControllers.deleteBranches);

export default router;