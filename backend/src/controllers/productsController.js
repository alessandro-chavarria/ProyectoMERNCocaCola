//array de funciones del CRUD
const productsController = {};
import productsModel from "../models/Products.js";

//SELECT
productsController.getProducts = async (req, res) => {
    const products = await productsModel.find()
    res.json(products)
}

//INSERT
productsController.insertProducts = async (req, res) => {
    const {name, description, price, stock} = req.body;
    const newProducts = new productsModel({name, description, price, stock})
    await newProducts.save()
    res.json({message: "product saved"});
}

//DELETE
productsController.deleteProduct = async (req, res) => {
    await productsModel.findByIdAndDelete(req.params.id);
    res.json({message: "product deleted"});
}

//UPDATE
productsController.updateProducts = async (req, res) => {
    const {name, description, price, stock} = req.body;
    const updatedProduct = await productsModel.findByIdAndUpdate(req.params.id, {name, description, price, stock}, {new: true})
    res.json({message: "product updated"});
}

export default productsController;