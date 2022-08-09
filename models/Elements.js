import mongoose from "mongoose";

const ElementsSchema = new mongoose.Schema({
    longitud: {
        type: Decimal,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    latitud:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    trabajador:{
        type: Boolean,
    },
    status:{
        type: Boolean,
    }
});

export const Elements = mongoose.model('Elements', ElementsSchema);