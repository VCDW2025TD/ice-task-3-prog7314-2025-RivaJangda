import mongoose from "mongoose";

const memeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Meme", memeSchema);
