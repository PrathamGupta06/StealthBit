import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    victimId: { type: String, required: true },
    demand: { type : String, default : "", required: false },
    fulfilled: { type: Boolean, default: false, required: false },
    fulfilledAt : { type: String, required: false },
}, { timestamps: true, strict: false });

export default mongoose.model('Request', requestSchema);