import mongoose from "mongoose";

const ElementsSchema = new mongoose.Schema({
    longitud: {
        type: Number,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    latitud:{
        type: Number,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    trabajador:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workers' 
    },
    status:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Status' 
    }
});

export const Elements = mongoose.model('Elements', ElementsSchema);