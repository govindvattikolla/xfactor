const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Student = require("../models/students");

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "../StudUploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "studuploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

//  POST request to add a student, including image
router.post("/add", upload.single("image"), async (req, res) => {
    try {
        console.log("Headers:", req.headers);
        console.log("Request body:", req.body);
        console.log("Uploaded file:", req.file);

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const imagePath = `/studUploads/${req.file.filename}`;
        console.log("Image path:", imagePath);

        const student = new Student({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            description: req.body.description,
            image: imagePath,
        });

        await student.save();
        res.status(201).json({ message: "Student added successfully", student });
    } catch (error) {
        console.error("Error adding student:", error);
        res.status(500).json({ message: "Error adding student", error: error.message });
    }
});

module.exports = router;
