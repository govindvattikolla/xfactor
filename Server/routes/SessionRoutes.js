const express = require("express");
const router = express.Router();
const Session = require("../models/AddSession");
const Course = require("../models/Courses");

// Add Session & Attach it to a Course Using Category
router.post("/add", async (req, res) => {
    try {
        console.log("Received Data:", req.body); // Debugging log

        const { image, title, timestamp, category, description } = req.body;

        // Check if all fields are present
        if (!image || !title || !timestamp || !category || !description) {
            console.log("Missing fields:", { image, title, timestamp, category, description });
            return res.status(400).json({ error: "All fields are required" });
        }

        const newSession = new Session({
            image,
            title,
            timestamp: new Date(timestamp),  // Convert to Date
            category,
            description
        });

        await newSession.save();
        res.status(201).json({ message: "Session added successfully" });

    } catch (error) {
        console.error("Error adding session:", error);
        if (error.name === "ValidationError") {
            return res.status(400).json({ error: "Session validation failed", details: error.errors });
        }
        res.status(500).json({ error: "Error adding session" });
    }
});



module.exports = router;
