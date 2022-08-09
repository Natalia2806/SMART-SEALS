import mongoose from "mongoose";


const WorkersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    cedula:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    tel:{
        type: String,
        required: true,
        trim: true,
    },
    ocupacion:{
        type: String,
        required: true,
        trim: true,
    },
    brigada:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brigade' 
    },
});

export const Workers = mongoose.model('Workers', WorkersSchema);