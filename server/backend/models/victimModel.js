import mongoose from "mongoose";

const Victim = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    description: { type: String, required: false },
    dateCreated: { type: Date, default: Date.now, required: false },
    lastSeen: { type: Date, default: Date.now, required: false },
}, { strict: true})

export default mongoose.model('Victim', Victim);    