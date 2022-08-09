import mongoose from "mongoose";

const StatusSchema = new mongoose.Schema({
    name: { type: String}
});

export const Status = mongoose.model('Status', StatusSchema);