import {Schema, model} from "mongoose";

const evaluationsSchemas = new Schema({
    comment: {
        type: String,
        requiere: true,

    },
    grade: {
        type: Number,
        requiere: true,
        min: 0,
        max: 5
    },
    role: {
        type: String,
        requiere: true
    },
    idEmployees: {
        type: Schema.Types.ObjectId,
        ref: "empleados",
        requiere: true
    }
}, {
    timestamps: true,
    strict: false
})

export default model("evaluations", evaluationsSchemas);