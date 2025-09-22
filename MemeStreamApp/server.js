import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Meme from "./models/Meme.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes

// Create a new meme
app.post("/memes", async (req, res) => {
    try {
        const meme = new Meme(req.body);
        await meme.save();
        res.status(201).json(meme);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all memes OR by userId
app.get("/memes", async (req, res) => {
    try {
        const { userId } = req.query;
        const memes = userId ? await Meme.find({ userId }) : await Meme.find();
        res.json(memes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Default route
app.get("/", (req, res) => {
    res.send("🚀 MemeStream API is running...");
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
