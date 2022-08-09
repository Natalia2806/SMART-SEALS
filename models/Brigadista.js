import mongoose from "mongoose";
const BrigadeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    vehicle_plate: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    estado: {
        type: Boolean,
    }
});


export const Brigade = mongoose.model('Brigade', BrigadeSchema);