const express = require("express");
const router = express.Router();
const Session = require("../models/AddSession"); // Assuming you have a Session model

router.post("/add", async (req, res) => {
    try {
        const { image, title, timestamp, price } = req.body;

        if (!image || !title || !timestamp || price === undefined) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newSession = new Session({
            image,
            title,
            timestamp,
            price
        });

        await newSession.save();
        res.status(200).json({ message: "Session added successfully", session: newSession });
    } catch (error) {
        console.error("Error adding session:", error);
        res.status(500).json({ error: "Error adding session" });
    }
});

module.exports = router;
