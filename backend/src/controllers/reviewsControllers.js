const reviewsController = {};
import { populate } from "dotenv";
import reviewsModel from "../models/Reviews.js";

//SELECT
reviewsController.getReviews = async (req, res) =>{
    const reviews = await reviewsModel.find().populate("idClient");
    res.json(reviews)
}

//INSERT
reviewsController.insertReviews = async (req, res) =>{
    const {comment, rating, idClient} = req.body;
    const newReviews = new reviewsModel({comment, rating, idClient})
    await newReviews.save()
    res.json({message: "review saved"})
}

//DELETE
reviewsController.deleteReviews = async (req, res) => {
    await reviewsModel.findByIdAndDelete(req.params.id);
    res.json({message: "review deleted"});
}

//UPDATE
reviewsController.updateReviews = async (req, res) => {
    const {comment, rating, idClient} = req.body;
    const updatedReviews = await reviewsModel.findByIdAndUpdate(req.params.id, {comment, rating, idClient}, {new: true})
    res.json({message: "review updated"});
}

export default reviewsController;