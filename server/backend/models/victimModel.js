import mongoose from "mongoose";

const Victim = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    img : { type: String, required: false },
    dateCreated: { type: Date, default: Date.now, required: false },
    lastSeen: { type: Date, default: Date.now, required: false },
    macAddress: { type: String, required: false },
}, { strict: true})

export default mongoose.model('Victim', Victim);    