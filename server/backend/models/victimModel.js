import mongoose from "mongoose";

const Victim = new mongoose.Schema({
    name: { type: String, required: true },
    macAddress: { type: String, required: true },
    username: { type: String, required: false },
    localIP: { type: String, required: false },
    publicIP: { type: String, required: false },
    description: { type: String, required: false },
    img : { type: String, required: false },
    dateCreated: { type: Date, default: Date.now, required: false },
    lastSeen: { type: Date, default: Date.now, required: false },
}, { strict: true})

export default mongoose.model('Victim', Victim);    