const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    timestamp: { type: Date, required: true },  // Ensure it's a Date type
    category: { type: String, required: true },
    image: { type: String, required: true },
});

module.exports = mongoose.model("Session", SessionSchema);
