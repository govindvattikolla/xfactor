const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    timestamp: { type: Date, required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    description: { type: String, required: true },
    recordingUrl: { type: String, default: "" }, // Optional field
    status: { type: String, enum: ["Scheduled", "Ongoing", "Completed"], required: true },
}, { timestamps: true });

module.exports = mongoose.model("Session", sessionSchema);
