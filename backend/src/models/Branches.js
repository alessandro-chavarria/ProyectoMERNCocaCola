import {Schema, model} from "mongoose";

const branchesSchema = new Schema({
    name: {
        type: String, 
        require: true,
        maxLength: 100
    },
    address: {
        type: String,
        require: true,
        maxLength: 250
    },
    telephone: {
        type: String,
        required: true,
        match: [
          /^[0-9]{8}$/,
          "El teléfono debe contener exactamente 8 dígitos numéricos"
        ]
    },
    schedule: {
        type: String, 
        require: true,
        maxLength: 100
    }
}, {
    timestamps: true,
    strict: false
});

export default model ("sucursales", branchesSchema);