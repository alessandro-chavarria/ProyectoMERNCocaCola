import {Schema, model} from "mongoose";

const employeesSchema = new Schema ({
    name: {
        type: String, 
        require: true,
        maxLength: 100
    },
    lastName: {
        type: String, 
        require: true,
        maxLength: 100
    },
    birthday: {
        type: Date,
        require: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
          "Por favor, ingrese un correo electrónico válido",
        ]
    },
    address: {
        type: String,
        require: true,
        maxLength: 250
    },
    hireDate: {
        type: Date,
        require: true,
    },
    password: {
        type: String,
        require: true,
        minLength: 6
    },
    telephone: {
        type: Number,
        required: true,
    },
    dui: {
        type: String,
      default: null, 
    },
    isssNumber: {
        type: Number,
        require: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    strict: false
});

export default model("empleados", employeesSchema);