/*
Campos: 
name 
description
price 
stock
*/
import { Schema, model} from "mongoose";

const productsSchemas = new Schema({
    name: {
        type: String, 
        require: true,
        maxLength: 100
    },
    description: {
        type: String,
        require: false
    },
    price: {
        type: Number,
        require: true,
        min: 0
    },
    stock: {
        type: Number,
        require: true, 
        min: 0
    }
}, {
    timestamps: true,
    strict: false
});

export default model("products", productsSchemas);